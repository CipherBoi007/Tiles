"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadFile = (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }
    // Handle PDF Catalogues locally (No Cloudinary)
    if (req.file.mimetype === 'application/pdf' || req.file.originalname.toLowerCase().endsWith('.pdf')) {
        const publicCataloguesDir = path_1.default.join(__dirname, '../../../SL-Tiles-Showroom/public/catalogues');
        if (!fs_1.default.existsSync(publicCataloguesDir)) {
            fs_1.default.mkdirSync(publicCataloguesDir, { recursive: true });
        }
        const safeFilename = `${Date.now()}-${req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const destinationPath = path_1.default.join(publicCataloguesDir, safeFilename);
        fs_1.default.copyFile(req.file.path, destinationPath, (copyErr) => {
            // Clean up temp file
            fs_1.default.unlink(req.file.path, () => { });
            if (copyErr) {
                console.error("Failed to save local PDF file:", copyErr);
                return res.status(500).json({ message: 'Failed to save PDF locally', error: copyErr });
            }
            // Return local static URL
            res.json({ url: `/catalogues/${safeFilename}` });
        });
        return;
    }
    // Handle Images via Cloudinary ONLY
    const uploadStream = cloudinary_1.default.uploader.upload_stream({ folder: 'tiles-showroom' }, (error, result) => {
        // Clean up the temp file
        fs_1.default.unlink(req.file.path, (err) => {
            if (err)
                console.error("Failed to delete temp file:", err);
        });
        if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ message: error.message || 'Upload failed', error });
        }
        res.json({ url: result?.secure_url });
    });
    fs_1.default.createReadStream(req.file.path).pipe(uploadStream);
};
exports.uploadFile = uploadFile;
