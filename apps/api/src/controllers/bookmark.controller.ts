import { Request, Response } from "express";
import { BookmarkService } from "../services/bookmark.service.js";
import { CreateBookmarkDTO } from "@vault/shared";

const service = new BookmarkService();

export class BookmarkController {
  static async list(_req: Request, res: Response) {
    try {
      const data = await service.getAll();
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const parsed = CreateBookmarkDTO.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ success: false, error: parsed.error.issues });
      }
      const data = await service.create(parsed.data);
      res.status(201).json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      if (!id) {
        return res.status(400).json({ success: false, error: "Missing bookmark id" });
      }
      await service.delete(id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
