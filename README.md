# NexaERP - Inventory & Business Operations ERP

A full-stack, production-ready ERP system for managing company operations including inventory, products, suppliers, purchases, sales, employees, expenses, invoices, and business reports.

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui |
| **Backend** | Node.js + Express + TypeScript + Prisma ORM |
| **Database** | PostgreSQL 16 |
| **Auth** | JWT (access + refresh tokens) + bcrypt |
| **Testing** | Jest + Supertest (backend), Vitest + RTL (frontend) |
| **CI/CD** | GitHub Actions |
| **Containerization** | Docker + docker-compose |

## Modules

1. **Authentication & Authorization** - JWT, RBAC (Admin, Manager, Employee, Viewer)
2. **Inventory Management** - Stock tracking, adjustments, low-stock alerts
3. **Product Catalog** - Products, variants, categories, pricing
4. **Supplier Management** - Profiles, ledger, performance ratings
5. **Purchase Management** - Purchase orders, GRN, returns
6. **Sales Management** - Sales orders, customers, quotations, returns
7. **Employee Management** - Profiles, attendance, leave, payroll
8. **Expense Management** - Vouchers, approval workflow, budget tracking
9. **Invoice & Billing** - Invoice generation, PDF export, payment tracking
10. **Reports & Dashboard** - KPIs, charts, P&L, export to CSV/PDF

## Prerequisites

- Node.js >= 20
- pnpm >= 9
- Docker & Docker Compose
- PostgreSQL 16 (via Docker or local)

## Quick Start

### 1. Clone & Install
`ash
git clone https://github.com/your-org/nexaerp.git
cd nexaerp
pnpm install
`

### 2. Start Database
`ash
docker-compose up -d
`

### 3. Configure Environment
`ash
cp apps/server/.env.example apps/server/.env
# Edit apps/server/.env with your values
`

### 4. Database Migration & Seed
`ash
pnpm db:migrate
pnpm db:seed
`

### 5. Start Development
`ash
pnpm dev
`

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- pgAdmin: http://localhost:5050

## Testing

`ash
# Run all tests
pnpm test

# Run server tests only
pnpm --filter server test

# Run client tests only
pnpm --filter client test

# Coverage report
pnpm --filter server test:coverage
`

## Project Structure

`
nexaerp/
â”œâ”€â”€ apps/
â”‚   â”œâ”€â”€ client/          # React + Vite frontend
â”‚   â””â”€â”€ server/          # Express + Prisma backend
â”œâ”€â”€ packages/
â”‚   â””â”€â”€ shared/          # Shared types & validators
â”œâ”€â”€ .github/
â”‚   â””â”€â”€ workflows/       # GitHub Actions CI
â”œâ”€â”€ docker-compose.yml
â””â”€â”€ pnpm-workspace.yaml
`

## Default Credentials (after seed)

| Role | Email | Password |
|---|---|---|
| Admin | admin@nexaerp.com | Admin@123 |
| Manager | manager@nexaerp.com | Manager@123 |
| Employee | employee@nexaerp.com | Employee@123 |

> Change all passwords immediately after first login in production.

## Deployment

- **Frontend**: Vercel (connect GitHub repo, set VITE_API_URL)
- **Backend**: Render / Railway (set environment variables)
- **Database**: Neon / Supabase / Railway PostgreSQL

## License

MIT License - see LICENSE for details.