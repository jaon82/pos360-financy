# Financy

A personal finance management application with a GraphQL backend and React frontend.

## Features

- **Authentication** — Register and login with JWT-based access and refresh tokens
- **Transactions** — Create, read, update, and delete income/expense transactions with date, amount, and category
- **Categories** — Manage custom categories with title, description, icon, and color
- **Dashboard** — Aggregated overview of financial activity

## Tech Stack

### Backend
- **Runtime:** Node.js + TypeScript
- **API:** Apollo Server 5 + TypeGraphQL (GraphQL)
- **Framework:** Express 5
- **ORM:** Prisma 7 (SQLite)
- **Auth:** JWT (`jsonwebtoken`) + `bcryptjs`
- **Tooling:** `tsx` (dev runner), Biome (linter/formatter)

### Frontend
- **Framework:** React 19 + Vite 8 + TypeScript
- **API client:** Apollo Client 4
- **Routing:** React Router 7
- **Forms:** React Hook Form + Zod
- **State:** Zustand
- **UI:** Tailwind CSS v4, shadcn/ui, Lucide icons, Sonner

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Environment Variables

Create a `.env` file inside `backend/` with the following variables:

```env
JWT_SECRET=your_secret_here
```

### Backend

```bash
cd backend
npm install       # also runs prisma generate
npm run dev       # starts on http://localhost:4000/graphql
```

### Frontend

```bash
cd frontend
npm install
npm run dev       # Vite dev server
```

## Project Structure

```
financy/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Express + Apollo Server bootstrap
│   │   ├── resolvers/        # GraphQL resolvers (auth, user, category, transaction)
│   │   ├── services/         # Business logic
│   │   ├── models/           # TypeGraphQL object types
│   │   ├── dtos/             # Input/output types
│   │   ├── graphql/context/  # JWT-based request context
│   │   ├── middlewares/      # Auth middleware
│   │   └── utils/            # JWT helpers, bcrypt
│   ├── prisma/
│   │   ├── schema.prisma     # Models: User, Category, Transaction (SQLite)
│   │   └── migrations/
│   └── schema.graphql        # Auto-generated GraphQL schema
│
└── frontend/
    └── src/
        ├── pages/            # Dashboard, Transactions, Categories, Login, Register
        ├── components/       # Shared UI components
        ├── lib/graphql/      # Apollo client, queries, mutations
        ├── routes/           # Route config with protected/public guards
        ├── store/            # Zustand auth state
        └── types/            # Shared TypeScript types
```

## Database

The project uses **SQLite** (file-based, zero-config) for local development. Prisma makes it straightforward to switch to PostgreSQL or another provider by updating `schema.prisma` and the `DATABASE_URL` env var.

To run migrations:

```bash
cd backend
npx prisma migrate dev
```

