import { db } from "../db/client.js";
import { Bookmark, CreateBookmarkInput } from "@vault/shared";
import { randomUUID } from "crypto";

export class BookmarkService {
  async getAll(): Promise<Bookmark[]> {
    const result = await db.execute("SELECT * FROM bookmarks ORDER BY created_at DESC");
    return result.rows.map((row) => ({
      id: String(row.id),
      title: String(row.title),
      url: String(row.url),
      description: String(row.description || ""),
      categoryId: String(row.category_id || row.category || "cat-general"),
      tags: JSON.parse(String(row.tags || "[]")),
      isPinned: Boolean(Number(row.is_pinned || 0)),
      isArchived: Boolean(Number(row.is_archived || 0)),
      clickCount: Number(row.click_count || 0),
      lastAccessedAt: row.last_accessed_at ? String(row.last_accessed_at) : null,
      createdAt: String(row.created_at || new Date().toISOString()),
      updatedAt: String(row.updated_at || row.created_at || new Date().toISOString())
    }));
  }

  async create(input: CreateBookmarkInput): Promise<Bookmark> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const categoryId = input.categoryId || "cat-general";
    const description = input.description || "";
    const tags = input.tags || [];
    const isPinned = input.isPinned ?? false;
    const isArchived = input.isArchived ?? false;

    // Ensure category exists before inserting foreign key reference
    const catCheck = await db.execute({
      sql: "SELECT id FROM categories WHERE id = ?",
      args: [categoryId]
    });

    if (catCheck.rows.length === 0) {
      const rawName = categoryId.replace(/^cat-/, "");
      const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      await db.execute({
        sql: "INSERT OR IGNORE INTO categories (id, name, slug, color, icon) VALUES (?, ?, ?, ?, ?)",
        args: [categoryId, formattedName, categoryId.toLowerCase(), "#38bdf8", "folder"]
      });
    }

    await db.execute({
      sql: "INSERT INTO bookmarks (id, title, url, description, category_id, tags, is_pinned, is_archived, click_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [
        id,
        input.title,
        input.url,
        description,
        categoryId,
        JSON.stringify(tags),
        isPinned ? 1 : 0,
        isArchived ? 1 : 0,
        0,
        now,
        now
      ]
    });

    return {
      id,
      title: input.title,
      url: input.url,
      description,
      categoryId,
      tags,
      isPinned,
      isArchived,
      clickCount: 0,
      lastAccessedAt: null,
      createdAt: now,
      updatedAt: now
    };
  }

  async delete(id: string): Promise<void> {
    await db.execute({ sql: "DELETE FROM bookmarks WHERE id = ?", args: [id] });
  }
}
