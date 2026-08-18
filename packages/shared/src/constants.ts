export const DEFAULT_CATEGORIES = [
	{ id: "cat-general", name: "General", slug: "general", color: "#94a3b8", icon: "folder" },
	{ id: "cat-dev", name: "Development", slug: "development", color: "#38bdf8", icon: "code" },
	{ id: "cat-tools", name: "Tools", slug: "tools", color: "#a855f7", icon: "wrench" },
	{ id: "cat-docs", name: "Documentation", slug: "docs", color: "#34d399", icon: "book-open" },
	{ id: "cat-reading", name: "Reading List", slug: "reading-list", color: "#fbbf24", icon: "bookmark" }
] as const;

export const SORT_FIELDS = ["createdAt", "updatedAt", "title", "clickCount"] as const;
export const SORT_ORDERS = ["asc", "desc"] as const;
