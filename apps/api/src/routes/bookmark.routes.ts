import { Router, type Router as ExpressRouter } from "express";
import { BookmarkController } from "../controllers/bookmark.controller.js";

const router: ExpressRouter = Router();
router.get("/", BookmarkController.list);
router.post("/", BookmarkController.create);
router.delete("/:id", BookmarkController.remove);

export default router;
