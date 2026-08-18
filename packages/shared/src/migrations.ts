export const SQL_MIGRATIONS = {
	v1_create_categories_table: `
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      color TEXT NOT NULL DEFAULT '#38bdf8',
      icon TEXT NOT NULL DEFAULT 'folder',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `,
	v1_create_bookmarks_table: `
    CREATE TABLE IF NOT EXISTS bookmarks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      description TEXT DEFAULT '',
      category_id TEXT NOT NULL DEFAULT 'cat-general',
      tags TEXT NOT NULL DEFAULT '[]',
      is_pinned INTEGER NOT NULL DEFAULT 0,
      is_archived INTEGER NOT NULL DEFAULT 0,
      click_count INTEGER NOT NULL DEFAULT 0,
      last_accessed_at DATETIME NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET DEFAULT
    );
  `,
	v1_create_indices: `
    CREATE INDEX IF NOT EXISTS idx_bookmarks_category ON bookmarks(category_id);
    CREATE INDEX IF NOT EXISTS idx_bookmarks_is_pinned ON bookmarks(is_pinned);
    CREATE INDEX IF NOT EXISTS idx_bookmarks_is_archived ON bookmarks(is_archived);
    CREATE INDEX IF NOT EXISTS idx_bookmarks_created_at ON bookmarks(created_at);
  `
} as const;
