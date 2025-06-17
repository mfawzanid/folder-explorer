import { ItemType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createItem = async (data: { name: string; parentId?: string | null; type: string }) => {
    return prisma.item.create({
        data: {
            name: data.name,
            parentId: data.parentId || null,
            type: data.type as ItemType,
        },
    });
};

export const getItems = async (type: ItemType, parentId?: string | null) => {
    return prisma.item.findMany({
        where: {
            type,
            parentId: parentId ?? null,
        },
    });
}

export const getItemById = async (id: string) => {
    return prisma.item.findUnique({ where: { id } });
}

export const getChildren = async (parentId: string) => {
    return prisma.item.findMany({
        where: { parentId },
        orderBy: { createdAt: "desc" }
    })
}