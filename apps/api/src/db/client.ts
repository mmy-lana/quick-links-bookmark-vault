import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN
});

import { SQL_MIGRATIONS, DEFAULT_CATEGORIES } from "@vault/shared";

export async function initDb() {
  await db.execute(SQL_MIGRATIONS.v1_create_categories_table);
  await db.execute(SQL_MIGRATIONS.v1_create_bookmarks_table);

  // Seed default categories if none exist
  for (const cat of DEFAULT_CATEGORIES) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO categories (id, name, slug, color, icon) VALUES (?, ?, ?, ?, ?)`,
      args: [cat.id, cat.name, cat.slug, cat.color, cat.icon]
    });
  }

  // Create indices
  await db.execute(SQL_MIGRATIONS.v1_create_indices);
}
