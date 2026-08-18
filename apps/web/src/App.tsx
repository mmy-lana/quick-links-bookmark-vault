import React, { useEffect, useState } from "react";
import { Bookmark, CreateBookmarkInput } from "@vault/shared";
import { api } from "./services/api";
import { Trash2, ExternalLink, BookmarkPlus } from "lucide-react";
import "./App.css";

export default function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [form, setForm] = useState<CreateBookmarkInput>({
    title: "",
    url: "",
    categoryId: "cat-general",
    description: "",
    tags: [],
    isPinned: false,
    isArchived: false
  });
  const [tagInput, setTagInput] = useState("");

  const loadData = async () => {
    try {
      const items = await api.getBookmarks();
      setBookmarks(items);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.url) return;
    await api.createBookmark({
      ...form,
      tags: tagInput.split(",").map(t => t.trim()).filter(Boolean)
    });
    setForm({
      title: "",
      url: "",
      categoryId: "cat-general",
      description: "",
      tags: [],
      isPinned: false,
      isArchived: false
    });
    setTagInput("");
    loadData();
  };

  const handleDelete = async (id: string) => {
    await api.deleteBookmark(id);
    loadData();
  };

  return (
    <div className="container">
      <header>
        <h1>Quick Links & Bookmark Vault</h1>
      </header>

      <form onSubmit={handleSubmit} className="vault-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="e.g. React Documentation"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            id="url"
            type="url"
            placeholder="https://react.dev"
            value={form.url}
            onChange={e => setForm({ ...form, url: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={form.categoryId}
            onChange={e => setForm({ ...form, categoryId: e.target.value })}
          >
            <option value="cat-general">General</option>
            <option value="cat-dev">Development</option>
            <option value="cat-tools">Tools</option>
            <option value="cat-docs">Documentation</option>
            <option value="cat-reading">Reading List</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            placeholder="frontend, reference, ui"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit"><BookmarkPlus size={18} /> Save Link</button>
        </div>
      </form>

      <div className="grid">
        {bookmarks.map((bm) => (
          <div key={bm.id} className="card">
            <div className="card-header">
              <span className="badge">{bm.categoryId}</span>
              <button className="delete-btn" onClick={() => bm.id && handleDelete(bm.id)}>
                <Trash2 size={16} />
              </button>
            </div>
            <h3>{bm.title}</h3>
            <a href={bm.url} target="_blank" rel="noopener noreferrer" className="link">
              Visit URL <ExternalLink size={14} />
            </a>
            <div className="tags">
              {bm.tags.map(t => <span key={t} className="tag">#{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
