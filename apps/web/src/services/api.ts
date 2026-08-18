import { ApiResponse, Bookmark, CreateBookmarkInput } from "@vault/shared";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api = {
  async getBookmarks(): Promise<Bookmark[]> {
    const res = await fetch(`${API_BASE}/api/bookmarks`);
    const data: ApiResponse<Bookmark[]> = await res.json();
    return data.data || [];
  },

  async createBookmark(payload: CreateBookmarkInput): Promise<Bookmark> {
    const res = await fetch(`${API_BASE}/api/bookmarks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data: ApiResponse<Bookmark> = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to create");
    return data.data!;
  },

  async deleteBookmark(id: string): Promise<void> {
    await fetch(`${API_BASE}/api/bookmarks/${id}`, { method: "DELETE" });
  }
};