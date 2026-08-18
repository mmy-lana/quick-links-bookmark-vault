# ⚡ Quick Links & Bookmark Vault

> High-speed developer bookmark management vault with category tagging and LibSQL persistence.

## 🌐 Live Deployments

- **Web Application (Vercel):** [https://quick-links-bookmark-vault-api.vercel.app](https://quick-links-bookmark-vault-api.vercel.app)
- **Backend API (Render):** [https://vault-api-jrg3.onrender.com](https://vault-api-jrg3.onrender.com)
- **API Health Check:** [https://vault-api-jrg3.onrender.com/health](https://vault-api-jrg3.onrender.com/health)

## 🛠️ Tech Stack

- **Monorepo:** Turborepo + pnpm Workspaces
- **Frontend (`apps/web`):** React 18, Vite, Lucide React
- **Backend (`apps/api`):** Node.js, Express, LibSQL Client (`@libsql/client`)
- **Shared (`packages/shared`):** Zod DTO contracts, validation schemas, SQL migration definitions
- **Database:** Turso / SQLite

---

## 📂 Monorepo Structure

```
├── apps/
│   ├── api/          # Express backend API & Turso data access
│   └── web/          # React SPA frontend
├── packages/
│   └── shared/       # Shared Zod schemas, types, DTOs & migrations
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js >= 20.x
- pnpm >= 9.x

### 2. Installation

```bash
pnpm install
```

### 3. Environment Setup

Copy example environment variables:

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

### 4. Development Server

Start both backend and frontend concurrently:

```bash
pnpm dev
```

- Web UI: `http://localhost:3000`
- API Health: `http://localhost:4000/health`

### 5. Production Build

```bash
pnpm build
```

---

## 🐳 Docker Deployment

```bash
docker compose up --build
```

---

## 📄 License

[MIT](LICENSE)
