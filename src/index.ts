import { PrismaClient } from "./generated/prisma";
import express, { Request, Response } from "express";

const prisma = new PrismaClient()
const app = express()
const port = 3000


app.use(express.json())

app.post('/folders', async (req: Request, res: Response) => {
  const { name, parentId } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Folder name is required" });
  }

  try {
    const folder = await prisma.folder.create({
      data: {
        name,
        parentId: parentId ?? null,
      },
    });

    res.status(201).json(folder);
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/folders', async (req: Request, res: Response) => {
    const rootFolders = await prisma.folder.findMany({
    where: {
      parentId: null,
    },
    include: {
      subfolders: true,
      files: true,
    },
  });

  res.json(rootFolders);
});

app.get('/folders/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const folder = await prisma.folder.findUnique({
        where: {id },
        include: {
            subfolders: true,
            files: true,
    },
  });

  if (!folder) {
    res.status(404).json({message: "Folder not found"});
  }

  res.json(folder);
});


app.post('/files', async (req: Request, res: Response) => {
  const { name, folderId } = req.body;

  if (!name) {
    return res.status(400).json({ message: "File name is required" });
  }  
  if (!folderId) {
    return res.status(400).json({ message: "Folder id is required" });
  }

  try {
    const file = await prisma.file.create({
      data: {
        name,
        folderId: folderId ?? null,
      },
    });

    res.status(201).json(file);
  } catch (error) {
    console.error("Error creating file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

