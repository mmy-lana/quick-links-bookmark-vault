export type SortField = "createdAt" | "updatedAt" | "title" | "clickCount";
export type SortOrder = "asc" | "desc";

export interface PaginationMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
	details?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
	success: boolean;
	data: T[];
	pagination: PaginationMeta;
}
