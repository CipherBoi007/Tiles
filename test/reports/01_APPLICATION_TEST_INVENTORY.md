# 01 - Application Test Inventory & Architecture Reconnaissance

## 1. Application Stack Identification
- **Frontend Framework**: React 19 + React Router DOM v7 + Vite 8
- **UI & Styling**: Vanilla CSS + TailwindCSS + Lucide React + Framer Motion
- **Backend Framework**: Node.js + Express 5 + TypeScript 6
- **Database ORM**: PostgreSQL + Prisma ORM v7
- **Authentication**: JWT (JSON Web Tokens) with 30d expiry + bcryptjs hashing
- **Security & Middleware**: Helmet (HTTP security headers), Express Rate Limit, CORS, Pino HTTP logger
- **Testing Infrastructure**: Jest + ts-jest, Supertest, Playwright E2E, Node Memory Audit, HTTP Benchmark

---

## 2. Comprehensive Component & Route Inventory

| Component / Layer | Functionality | Endpoint / Page Route | Risk Level | Auth Required | Recommended Test Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Auth Controller** | Admin Login | `POST /api/auth/login` | **CRITICAL** | Public | Supertest, E2E |
| **Categories Controller** | CRUD Categories | `GET, POST, PUT, DELETE /api/categories` | **HIGH** | GET: Public, Write: Admin | Unit, Supertest, E2E |
| **SubCategories Controller**| CRUD SubCategories | `GET, POST, PUT, DELETE /api/subcategories` | **HIGH** | GET: Public, Write: Admin | Unit, Supertest, E2E |
| **Tiles Controller** | CRUD Tile Products | `GET, POST, PUT, DELETE /api/tiles` | **CRITICAL** | GET: Public, Write: Admin | Unit, Supertest, Benchmark |
| **Stats Controller** | Dashboard Aggregation| `GET /api/stats` | **MEDIUM** | Required (Admin) | Supertest |
| **Enquiry Controller** | Customer Lead Intake| `POST /api/enquiries` | **HIGH** | Public | Unit, Supertest |
| **Catalogue Controller** | Brochure PDF Access | `GET /api/catalogues` | **LOW** | Public | Supertest |
| **Public Showroom Frontend**| Hero, Catalog, Modals| `http://localhost:5173/` | **CRITICAL** | Public | Playwright E2E |
| **Admin Panel Frontend** | Dashboard, Drawers | `http://localhost:5173/admin/*` | **CRITICAL** | Required (Admin) | Playwright E2E |
| **System Health** | DB Connectivity Check| `GET /api/health` | **MEDIUM** | Public | Supertest, Load |
