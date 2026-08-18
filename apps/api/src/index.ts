import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookmarkRoutes from "./routes/bookmark.routes.js";
import { initDb } from "./db/client.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/bookmarks", bookmarkRoutes);
app.get("/health", (_req, res) => res.json({ status: "healthy" }));

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Bookmark Vault API running on port ${port}`);
  });
}).catch(console.error);