import { ItemType } from "@prisma/client";
import * as itemRepo from "../repositories/itemRepository";

export const createItem = async (data: { name: string; parentId?: string; type: string }) => {
    if (!data.name) throw new Error("Item name is required");

    if (!Object.values(ItemType).includes(data.type as ItemType))
        throw new Error("Invalid type, must 'folder' or 'file'");

    if (data.type === "file" && !data.parentId) {
        throw new Error("Item type 'file' must have parent id'");
    }

    return itemRepo.createItem(data);
};

export const getItems = async (type: string, parentId?: string | null) => {
    return itemRepo.getItems(type as ItemType, parentId)
}

export const getItemByIdWithChildren = async (id: string) => {
    const item = await itemRepo.getItemById(id);
    if (!item) return null;

    const children = await itemRepo.getChildren(id)
    return { ...item, children };
}