import { Router } from 'express';
import { login } from '../controllers/authController';
import { getTiles, createTile, updateTile, deleteTile } from '../controllers/tilesController';
import { getCollections, createCollection, updateCollection, deleteCollection } from '../controllers/collectionsController';
import { getCatalogues, createCatalogue, deleteCatalogue } from '../controllers/cataloguesController';
import { getEnquiries, createEnquiry, updateEnquiryStatus, deleteEnquiry } from '../controllers/enquiriesController';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { getDashboardStats, getRecentActivity } from '../controllers/statsController';
import { uploadFile } from '../controllers/uploadController';
import { protect } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { loginSchema, enquirySchema, tileSchema } from '../schemas';

const router = Router();

// Auth
router.post('/auth/login', validate(loginSchema), login);

// Tiles
router.get('/tiles', getTiles);
router.post('/tiles', protect, validate(tileSchema), createTile);
router.put('/tiles/:id', protect, validate(tileSchema), updateTile);
router.delete('/tiles/:id', protect, deleteTile);

// Collections
router.get('/collections', getCollections);
router.post('/collections', protect, createCollection);
router.put('/collections/:id', protect, updateCollection);
router.delete('/collections/:id', protect, deleteCollection);

// Catalogues
router.get('/catalogues', getCatalogues);
router.post('/catalogues', protect, createCatalogue);
router.delete('/catalogues/:id', protect, deleteCatalogue);

// Enquiries
router.get('/enquiries', protect, getEnquiries);
// Public endpoint for submitting enquiries
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
