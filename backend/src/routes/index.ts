import { Router } from 'express';
import rateLimit from 'express-rate-limit';
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
import {
  loginSchema,
  enquirySchema,
  tileSchema,
  categorySchema,
  subCategorySchema,
  catalogueSchema,
} from '../schemas';

const router = Router();

// Brute-force protection for admin login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Please try again in 15 minutes.' },
});

// Spam protection for the public enquiry / lead forms
const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many enquiries submitted. Please try again later.' },
});

// Auth
router.post('/auth/login', loginLimiter, validate(loginSchema), login);

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
router.post('/enquiries', enquiryLimiter, validate(enquirySchema), createEnquiry);
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
