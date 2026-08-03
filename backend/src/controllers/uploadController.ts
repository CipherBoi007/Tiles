import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';
import fs from 'fs';

export const uploadFile = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: 'tiles-showroom' },
    (error, result) => {
      // Clean up the temp file
      fs.unlink(req.file!.path, (err) => {
        if (err) console.error("Failed to delete temp file:", err);
      });

      if (error) return res.status(500).json({ message: 'Upload failed', error });
      res.json({ url: result?.secure_url });
    }
  );

  fs.createReadStream(req.file.path).pipe(uploadStream);
};
