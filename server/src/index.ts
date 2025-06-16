import { ItemType, PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";
import { asyncHandler } from "./utils/asyncHandler";

const prisma = new PrismaClient()
const app = express()
app.use(cors());
const port = 3000

app.use(express.json())

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res.send("Hello World");
  })
);

app.post(
  '/items',
  asyncHandler(async (req: Request, res: Response) => {
    const { name, parentId, type } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Item name is required" });
    }

    if (!Object.values(ItemType).includes(type as ItemType)) {
      return res.status(400).json({ message: "Item type name must be 'folder' or 'file'" });
    }
    if (type === 'file' && !parentId) {
      return res.status(400).json({ message: "Item type 'file' must have parent id'" });
    }

    try {
      const folder = await prisma.item.create({
        data: {
          name,
          parentId: parentId ?? null,
          type,
        },
      });

      res.status(201).json(folder);
    } catch (error) {
      console.error("Error creating item:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

app.get(
  '/items',
  asyncHandler(async (req: Request, res: Response) => {
    const { type } = req.query;
    const typeStr = String(type);

    if (!Object.values(ItemType).includes(typeStr as ItemType)) {
      return res.status(400).json({ message: "Item type name must be 'folder' or 'file'" });
    }

    const rootItems = await prisma.item.findMany({
      where: {
        parentId: null,
        type: typeStr as ItemType,
      }
    });

    res.json(rootItems);
  })
);

app.get('/items/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const item = await prisma.item.findUnique({
    where: { id },
  });

  if (!item) {
    res.status(404).json({ message: "Item not found" });
  }

  const children = await prisma.item.findMany({
    where: { parentId: id },
    orderBy: { createdAt: 'desc' },
  })

  res.json({ ...item, children });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

