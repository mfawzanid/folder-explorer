import { Request, Response } from "express";
import { ItemType } from "@prisma/client";
import * as itemService from "../services/itemService";

export const createItem = async (req: Request, res: Response) => {
    const item = await itemService.createItem(req.body);
    res.status(201).json(item);
};

export const getItems = async (req: Request, res: Response) => {
    const { type, parentId } = req.query;

    if (!type || typeof type !== 'string' || !Object.values(ItemType).includes(type as ItemType)) {
        return res.status(404).json({ message: "Invalid type, must be 'folder' or 'file'" });
    }

    const items = await itemService.getItems(req.query.type as string, req.query.parentId as string);
    return res.json(items)
}

export const getItemById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await itemService.getItemByIdWithChildren(id);

    if (!item) {
        return res.status(404).json({ message: "Item with id '${id}' not found" });
    }

    res.json(item);
};