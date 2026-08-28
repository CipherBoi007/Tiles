# Master Defect Register

## Defect Summary
- **Total Defects Identified**: 2
- **Critical / High Severity**: 1
- **Medium Severity**: 1
- **Resolved Defects**: 2
- **Open / Unresolved Defects**: 0

---

## Defect Log

### Defect BUG-001: Controller Exception on Undefined Relational `_count`
- **ID**: `BUG-001`
- **Severity**: `HIGH`
- **Component**: `backend/src/controllers/categoriesController.ts` & `subCategoriesController.ts`
- **Description**: Unhandled `TypeError: Cannot read properties of undefined (reading 'map')` when relational count `_count` is absent.
- **Expected Behavior**: Controllers should handle optional relational fields safely.
- **Actual Behavior**: Threw 500 Internal Server Error.
- **Resolution**: Added optional chaining `c._count?.subCategories || 0` and `sc._count?.tiles || 0`.
- **Status**: **RESOLVED & VERIFIED**

---

### Defect UI-001: Modal Overlay Clipped Behind Admin Topbar Header
- **ID**: `UI-001`
- **Severity**: `MEDIUM`
- **Component**: `SL-Tiles-Showroom/src/components/admin/Modal.jsx`
- **Description**: Modal overlay z-index (`z-50`) was lower than Topbar z-index (`z-[60]`), causing topbar to render over backdrop.
- **Expected Behavior**: Overlay should cover entire screen including header.
- **Actual Behavior**: Header clipped through dark backdrop.
- **Resolution**: Updated Modal z-index to `z-[1000]` and refactored creation forms to a clean right-to-left `Drawer.jsx` slide-over.
- **Status**: **RESOLVED & VERIFIED**
