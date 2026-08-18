import { z } from "zod";
import { SORT_FIELDS, SORT_ORDERS } from "./constants.js";

export const CategorySchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1, "Category name is required").max(50),
	slug: z.string().min(1).max(50),
	color: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Must be a valid hex color code"),
	icon: z.string().min(1).default("folder"),
	createdAt: z.string().datetime().optional()
});

export const BookmarkSchema = z.object({
	id: z.string().uuid(),
	title: z.string().min(1, "Title is required").max(200),
	url: z.string().url("Must be a valid HTTP or HTTPS URL"),
	description: z.string().max(1000).optional().default(""),
	categoryId: z.string().min(1).default("cat-general"),
	tags: z.array(z.string().min(1).max(30)).default([]),
	isPinned: z.boolean().default(false),
	isArchived: z.boolean().default(false),
	clickCount: z.number().int().nonnegative().default(0),
	lastAccessedAt: z.string().datetime().nullable().optional(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime()
});

export const BookmarkFilterQuerySchema = z.object({
	search: z.string().optional(),
	categoryId: z.string().optional(),
	tag: z.string().optional(),
	isPinned: z
		.enum(["true", "false"])
		.transform((val) => val === "true")
		.optional(),
	isArchived: z
		.enum(["true", "false"])
		.transform((val) => val === "true")
		.optional(),
	sortBy: z.enum(SORT_FIELDS).default("createdAt"),
	sortOrder: z.enum(SORT_ORDERS).default("desc"),
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().int().positive().max(100).default(20)
});
