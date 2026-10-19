# Automated Tile Catalogue Extraction & Prisma Import System

## 1. Overview & System Architecture

This production-grade system enables the showroom administrator to extract genuine product specifications and high-resolution images from tile manufacturer websites (**Italake** and **Itaca**), review and validate candidate records in an interactive dashboard, map products to showroom Categories and SubCategories, run safety simulations (Dry-Run), and import approved records into PostgreSQL via Prisma ORM.

### Architecture Workflow

```
┌─────────────────────────────────┐      ┌─────────────────────────────────┐
│     Italake (italake.com)       │      │        Itaca (itaca.in)         │
│  - Luxury Surface Series        │      │  - Domestic Collections         │
│  - Big Slabs (1200x2400, etc.)  │      │  - Export Collections           │
│  - GVT/PGVT (600x1200, etc.)    │      │  - Structured Specifications    │
└────────────────┬────────────────┘      └────────────────┬────────────────┘
                 │                                        │
                 └───────────────────┬────────────────────┘
                                     │
                                     ▼
                    ┌──────────────────────────────────┐
                    │ safeFetch & DNS Bypass (8.8.8.8) │
                    │ - SSRF Protection (Domain Allow) │
                    │ - Anti-hijack IP resolver        │
                    │ - Rate limiting & Retries        │
                    └─────────────────┬────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────┐
                    │  Image Validation (Magic Bytes)  │
                    │  - Format check (JPEG, PNG, WEBP)│
                    │  - HTML detection & rejection    │
                    │  - MD5 Content Hash              │
                    └─────────────────┬────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────┐
                    │ Multi-Level Duplicate Detection  │
                    │ - Exact ID / canonical URL check │
                    │ - Batch & DB Product Code check  │
                    │ - Normalized Name matching       │
                    └─────────────────┬────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────┐
                    │ Review Files & Prisma Staging DB │
                    │ - ExtractedProduct (Staging)     │
                    │ - ImportJob (Execution Progress) │
                    │ - catalogue-review.csv / .json   │
                    │ - catalogue-errors.csv           │
                    └─────────────────┬────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────┐
                    │   Admin Dashboard UI (/admin)    │
                    │   - Progress & Statistics Cards  │
                    │   - Category / SubCategory Map   │
                    │   - Batch Approval / Rejection   │
                    │   - Dry-Run Simulation Modal     │
                    └─────────────────┬────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────┐
                    │ Prisma Transaction Batch Import  │
                    │ - Idempotent create/skip/update  │
                    │ - Writes to live Tile table      │
                    │ - Logs to Activity audit table   │
                    └──────────────────────────────────┘
```

---

## 2. Manufacturer Website Findings

### A. Itaca (`https://www.itaca.in`)
- **Discovery Strategy**: Crawls `domestic-collection.php` and `export-collection.php`, discovering 48+ unique product links matching `product-details.php?pid=<id>&sid=<id>&pname=<slug>`.
- **Structured Fields Extracted**:
  - `Product ID` (from `pid` parameter)
  - `Product Name` (from `<h2 class="section-title">`)
  - `Collection / Series` (e.g., *Earthtech*)
  - `Size` (e.g., *1200x1800mm*, *600x1200mm*)
  - `Finish` (e.g., *GHR+COLORBODY+PUNCH*, *High Gloss*)
  - `Primary Image URL` (from `uploads/products/...`)
  - `Gallery & Preview Images` (from `uploads/products_random/...` and `uploads/products_previews/...`)
- **Network Consideration**: Some local Indian ISPs (such as Vodafone Idea) perform DNS hijacking on `itaca.in`. `safeFetch.ts` automatically uses Google DNS / static host resolution (`119.18.54.95`) to guarantee reliable scraping.

### B. Italake (`https://italake.com`)
- **Discovery Strategy**: Inspects the homepage luxury slider (`/images/slider/`) and megamenu size categories (`/our-product/`).
- **Structured Fields Extracted**:
  - `Product Name` (e.g., *ARTISTIC GREEN*, *COVENTRY GOLD WHITE*, *HERITAGE DECOR*, *MORTAL SUPER WHITE*)
  - `Category Group` (*Big Slabs*, *GVT/PGVT*, *Digital Wall Tiles*)
  - `Tile Dimensions` (*800 x 2400 x 15 mm*, *1200 x 1800 mm*, *600 x 1200 mm*, *300 x 600 mm*, etc.)
  - `Finish` (*Glazed Vitrified Slab*, *High Gloss Polished*, *Ceramic Gloss/Matt*)
  - `Primary Image URL` (`/images/slider/...` and `/uploads/size_logo/...`)
  - `Source Canonical URLs`

---

## 3. Database Schema Changes & Provenance

The database schema was safely extended without resetting, deleting, or altering existing records:

### 1. `model Tile` (Backward-Compatible Optional Provenance Fields)
```prisma
model Tile {
  id            Int         @id @default(autoincrement())
  name          String
  image         String
  subCategoryId Int
  subCategory   SubCategory @relation(fields: [subCategoryId], references: [id], onDelete: Cascade)
  productCode   String?     // Manufacturer product code / PID
  manufacturer  String?     // 'Italake' | 'Itaca'
  collection    String?     // Manufacturer series (e.g. Earthtech, Surface Series)
  size          String?     // e.g. '1200x1800mm'
  finish        String?     // e.g. 'Glazed Vitrified'
  sourceUrl     String?     // Canonical URL on manufacturer site
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  @@index([name])
  @@index([subCategoryId])
}
```

### 2. `model ExtractedProduct` (Staging Table for Review)
Maintains full provenance of scraped candidates until explicit administrator approval:
- `importId`: Stable identifier (e.g. `itaca-pid-46`, `italake-artistic-green`)
- `manufacturer`: `Italake` or `Itaca`
- `sourceUrl`: Full source page URL
- `name`, `collection`, `size`, `finish`
- `suggestedCategory`, `suggestedSubCategory`
- `targetCategoryId`, `targetSubCategoryId`: Selected showroom hierarchy mapping
- `primaryImageUrl`, `galleryImages`
- `imageStatus`: `'valid'` | `'invalid'` | `'pending'`
- `duplicateStatus`: `'unique'` | `'exact_duplicate'` | `'potential_duplicate'`
- `reviewStatus`: `'pending_review'` | `'approved'` | `'rejected'` | `'imported'`
- `importedTileId`: Linked showroom `Tile.id` upon import

### 3. `model ImportJob` (Job Queue & Tracking)
Tracks extraction runs, progress, errors, and statistics.

---

## 4. API Endpoints Reference

All endpoints are mounted under `/api` and protected by the existing `protect` JWT middleware:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/catalogue-import/jobs` | Start an extraction job (`manufacturer`, `maxProducts`, `validateImages`) |
| `GET` | `/api/catalogue-import/jobs/latest` | Fetch most recent job |
| `GET` | `/api/catalogue-import/jobs/:id` | Poll job progress in real-time |
| `POST` | `/api/catalogue-import/jobs/:id/cancel` | Cancel an ongoing extraction |
| `GET` | `/api/catalogue-import/products` | Paginated candidate products with search, manufacturer, and status filters |
| `PATCH` | `/api/catalogue-import/products/:id` | Edit candidate name, category/subcategory mapping, and review status |
| `POST` | `/api/catalogue-import/products/batch-review` | Batch approve or reject candidate products |
| `POST` | `/api/catalogue-import/dry-run` | Run import simulation (reports `CREATE`, `SKIP`, `UPDATE`, `ERROR`) |
| `POST` | `/api/catalogue-import/import` | Execute transactional import into PostgreSQL |
| `GET` | `/api/catalogue-import/stats` | Retrieve total, pending, approved, imported, and image statistics |
| `GET` | `/api/catalogue-import/export/:type` | Download review file (`csv`, `json`, `errors`, `summary`) |

---

## 5. Security & Reliability

1. **SSRF Allowlist**:
   Outbound network requests are strictly restricted to approved domains:
   - `italake.com`, `www.italake.com`
   - `itaca.in`, `www.itaca.in`
   - `images.unsplash.com`
   - `res.cloudinary.com`
   Localhost, loopback (`127.0.0.1`), AWS metadata (`169.254.169.254`), and private RFC1918 subnets are blocked.
2. **Magic Byte Image Validation**:
   Checks binary buffers (`FF D8 FF` for JPEG, `89 50 4E 47` for PNG, `RIFF...WEBP` for WebP). HTML error pages served under `.jpg` extensions are detected and flagged as invalid.
3. **Prisma Transactions**:
   Imports run in `prisma.$transaction()`. Any failure on an individual tile rolls back cleanly.
4. **Rate Limiting & Backoff**:
   Configurable polite crawl delays (300-500ms) with exponential backoff on transient errors.

---

## 6. How to Run & Verify

### Running the Backend
```bash
cd backend
npm run dev
```

### Running the Frontend
```bash
cd SL-Tiles-Showroom
npm run dev
```
Open `http://localhost:5173/admin/catalogue-import` in your browser.

### Running Automated Tests
```bash
cd backend
npm test -- tests/catalogueImport.test.ts
```
Or run the entire test suite:
```bash
npm test
```

### Testing a Dry Run via CLI
```bash
node -e "
const { importService } = require('./dist/src/scraper/importService');
importService.runDryRun().then(r => console.log('Dry run simulation:', JSON.stringify(r.summary, null, 2)));
"
```

---

## 7. Rollback Procedures

If an import needs to be rolled back:
1. Every imported tile record in `Tile` is tagged with `importedTileId` in `ExtractedProduct`.
2. Delete only the imported batch items using Prisma:
   ```typescript
   await prisma.tile.deleteMany({
     where: { manufacturer: { in: ['Italake', 'Itaca'] } }
   });
   await prisma.extractedProduct.updateMany({
     where: { reviewStatus: 'imported' },
     data: { reviewStatus: 'approved', importedTileId: null }
   });
   ```
3. Existing showroom products with `manufacturer: null` are never touched.
