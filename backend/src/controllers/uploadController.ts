import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';
import fs from 'fs';
import path from 'path';

export const uploadFile = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  // Handle PDF Catalogues locally (No Cloudinary)
  if (req.file.mimetype === 'application/pdf' || req.file.originalname.toLowerCase().endsWith('.pdf')) {
    const publicCataloguesDir = path.join(__dirname, '../../../SL-Tiles-Showroom/public/catalogues');
    if (!fs.existsSync(publicCataloguesDir)) {
      fs.mkdirSync(publicCataloguesDir, { recursive: true });
    }

    const safeFilename = `${Date.now()}-${req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const destinationPath = path.join(publicCataloguesDir, safeFilename);

    fs.copyFile(req.file.path, destinationPath, (copyErr) => {
      // Clean up temp file
      fs.unlink(req.file!.path, () => {});

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
  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: 'tiles-showroom' },
    (error, result) => {
      // Clean up the temp file
      fs.unlink(req.file!.path, (err) => {
        if (err) console.error("Failed to delete temp file:", err);
      });

      if (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ message: error.message || 'Upload failed', error });
      }
      res.json({ url: result?.secure_url });
    }
  );

  fs.createReadStream(req.file.path).pipe(uploadStream);
};
