import { z } from "zod";
import { BookmarkSchema, CategorySchema, BookmarkFilterQuerySchema } from "./schema.js";

export const CreateBookmarkDTO = BookmarkSchema.omit({
	id: true,
	clickCount: true,
	lastAccessedAt: true,
	createdAt: true,
	updatedAt: true
}).extend({
	description: z.string().max(1000).optional().default(""),
	categoryId: z.string().optional().default("cat-general"),
	tags: z.array(z.string().min(1).max(30)).optional().default([]),
	isPinned: z.boolean().optional().default(false),
	isArchived: z.boolean().optional().default(false)
});

export const UpdateBookmarkDTO = CreateBookmarkDTO.partial();

export const CreateCategoryDTO = CategorySchema.omit({
	id: true,
	createdAt: true
}).extend({
	slug: z.string().optional(),
	icon: z.string().optional().default("folder")
});

export const UpdateCategoryDTO = CreateCategoryDTO.partial();

export const BulkDeleteDTO = z.object({
	ids: z.array(z.string().uuid()).min(1, "At least one ID must be provided")
});

export type Category = z.infer<typeof CategorySchema>;
export type Bookmark = z.infer<typeof BookmarkSchema>;
export type CreateBookmarkInput = z.infer<typeof CreateBookmarkDTO>;
export type UpdateBookmarkInput = z.infer<typeof UpdateBookmarkDTO>;
export type CreateCategoryInput = z.infer<typeof CreateCategoryDTO>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategoryDTO>;
export type BookmarkFilterQuery = z.infer<typeof BookmarkFilterQuerySchema>;
export type BulkDeleteInput = z.infer<typeof BulkDeleteDTO>;
