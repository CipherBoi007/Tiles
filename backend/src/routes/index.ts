import { Router } from 'express';
import { login } from '../controllers/authController';
import { getTiles, createTile, updateTile, deleteTile } from '../controllers/tilesController';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoriesController';
import { getSubCategories, createSubCategory, updateSubCategory, deleteSubCategory } from '../controllers/subCategoriesController';
import { getCatalogues, createCatalogue, deleteCatalogue } from '../controllers/cataloguesController';
import { getEnquiries, createEnquiry, updateEnquiryStatus, deleteEnquiry } from '../controllers/enquiriesController';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { getDashboardStats, getRecentActivity } from '../controllers/statsController';
import { uploadFile } from '../controllers/uploadController';
import { protect } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { loginSchema, enquirySchema, tileSchema, categorySchema, subCategorySchema, catalogueSchema } from '../schemas';

const router = Router();

// Auth
router.post('/auth/login', validate(loginSchema), login);

// Categories
router.get('/categories', getCategories);
router.post('/categories', protect, validate(categorySchema), createCategory);
router.put('/categories/:id', protect, validate(categorySchema), updateCategory);
router.delete('/categories/:id', protect, deleteCategory);

// SubCategories
router.get('/subcategories', getSubCategories);
router.post('/subcategories', protect, validate(subCategorySchema), createSubCategory);
router.put('/subcategories/:id', protect, validate(subCategorySchema), updateSubCategory);
router.delete('/subcategories/:id', protect, deleteSubCategory);

// Backward Compatibility for Collections -> Categories
router.get('/collections', getCategories);
router.post('/collections', protect, validate(categorySchema), createCategory);
router.put('/collections/:id', protect, validate(categorySchema), updateCategory);
router.delete('/collections/:id', protect, deleteCategory);

// Tiles
router.get('/tiles', getTiles);
router.post('/tiles', protect, validate(tileSchema), createTile);
router.put('/tiles/:id', protect, validate(tileSchema), updateTile);
router.delete('/tiles/:id', protect, deleteTile);

// Catalogues
router.get('/catalogues', getCatalogues);
router.post('/catalogues', protect, validate(catalogueSchema), createCatalogue);
router.delete('/catalogues/:id', protect, deleteCatalogue);

// Enquiries
router.get('/enquiries', protect, getEnquiries);
router.post('/enquiries', validate(enquirySchema), createEnquiry);
router.put('/enquiries/:id', protect, updateEnquiryStatus);
router.delete('/enquiries/:id', protect, deleteEnquiry);

// Settings
router.get('/settings', getSettings);
router.put('/settings/:id', protect, updateSettings);

// Stats
router.get('/stats', protect, getDashboardStats);
router.get('/activity', protect, getRecentActivity);

// Uploads
router.post('/upload', protect, upload.single('file'), uploadFile);

export default router;
