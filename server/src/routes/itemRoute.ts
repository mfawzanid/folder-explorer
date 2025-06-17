import { Router } from "express";
import * as itemController from "../controllers/itemController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/", asyncHandler(itemController.createItem));
router.get("/", asyncHandler(itemController.getItems));
router.get("/:id", asyncHandler(itemController.getItemById));

export default router;