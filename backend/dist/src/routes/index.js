"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const tilesController_1 = require("../controllers/tilesController");
const collectionsController_1 = require("../controllers/collectionsController");
const cataloguesController_1 = require("../controllers/cataloguesController");
const enquiriesController_1 = require("../controllers/enquiriesController");
const settingsController_1 = require("../controllers/settingsController");
const statsController_1 = require("../controllers/statsController");
const uploadController_1 = require("../controllers/uploadController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const uploadMiddleware_1 = require("../middlewares/uploadMiddleware");
const validateMiddleware_1 = require("../middlewares/validateMiddleware");
const schemas_1 = require("../schemas");
const router = (0, express_1.Router)();
// Auth
router.post('/auth/login', (0, validateMiddleware_1.validate)(schemas_1.loginSchema), authController_1.login);
// Tiles
router.get('/tiles', tilesController_1.getTiles);
router.post('/tiles', authMiddleware_1.protect, (0, validateMiddleware_1.validate)(schemas_1.tileSchema), tilesController_1.createTile);
router.put('/tiles/:id', authMiddleware_1.protect, (0, validateMiddleware_1.validate)(schemas_1.tileSchema), tilesController_1.updateTile);
router.delete('/tiles/:id', authMiddleware_1.protect, tilesController_1.deleteTile);
// Collections
router.get('/collections', collectionsController_1.getCollections);
router.post('/collections', authMiddleware_1.protect, collectionsController_1.createCollection);
router.put('/collections/:id', authMiddleware_1.protect, collectionsController_1.updateCollection);
router.delete('/collections/:id', authMiddleware_1.protect, collectionsController_1.deleteCollection);
// Catalogues
router.get('/catalogues', cataloguesController_1.getCatalogues);
router.post('/catalogues', authMiddleware_1.protect, cataloguesController_1.createCatalogue);
router.delete('/catalogues/:id', authMiddleware_1.protect, cataloguesController_1.deleteCatalogue);
// Enquiries
router.get('/enquiries', authMiddleware_1.protect, enquiriesController_1.getEnquiries);
// Public endpoint for submitting enquiries
router.post('/enquiries', (0, validateMiddleware_1.validate)(schemas_1.enquirySchema), enquiriesController_1.createEnquiry);
router.put('/enquiries/:id', authMiddleware_1.protect, enquiriesController_1.updateEnquiryStatus);
router.delete('/enquiries/:id', authMiddleware_1.protect, enquiriesController_1.deleteEnquiry);
// Settings
router.get('/settings', settingsController_1.getSettings);
router.put('/settings/:id', authMiddleware_1.protect, settingsController_1.updateSettings);
// Stats
router.get('/stats', authMiddleware_1.protect, statsController_1.getDashboardStats);
router.get('/activity', authMiddleware_1.protect, statsController_1.getRecentActivity);
// Uploads
router.post('/upload', authMiddleware_1.protect, uploadMiddleware_1.upload.single('file'), uploadController_1.uploadFile);
exports.default = router;
