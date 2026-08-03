"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const uploadFile = (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }
    const uploadStream = cloudinary_1.default.uploader.upload_stream({ folder: 'tiles-showroom' }, (error, result) => {
        // Clean up the temp file
        fs_1.default.unlink(req.file.path, (err) => {
            if (err)
                console.error("Failed to delete temp file:", err);
        });
        if (error)
            return res.status(500).json({ message: 'Upload failed', error });
        res.json({ url: result?.secure_url });
    });
    fs_1.default.createReadStream(req.file.path).pipe(uploadStream);
};
exports.uploadFile = uploadFile;
