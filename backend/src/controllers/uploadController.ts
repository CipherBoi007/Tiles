import { Request, Response } from 'express';
import fs from 'fs';
import cloudinary from '../utils/cloudinary';
import { uploadCataloguePdf } from '../utils/supabaseStorage';

const removeTempFile = (filePath: string) => {
  fs.unlink(filePath, (err) => {
    // A temp file that is already gone is harmless; anything else is worth logging.
    if (err && err.code !== 'ENOENT') console.error('Failed to delete temp file:', err);
  });
};

const isPdf = (file: Express.Multer.File) =>
  file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf');

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  // PDF catalogues -> Supabase Storage (persistent, unlike the host's local disk)
  if (isPdf(file)) {
    try {
      const url = await uploadCataloguePdf(file.path, file.originalname);
      res.json({ url });
    } catch (error: any) {
      if (req.log) req.log.error(error);
      res.status(500).json({ message: error?.message || 'PDF upload failed' });
    } finally {
      removeTempFile(file.path);
    }
    return;
  }

  // Images -> Cloudinary
  const uploadStream = cloudinary.uploader.upload_stream({ folder: 'tiles-showroom' }, (error, result) => {
    removeTempFile(file.path);
    if (error) {
      if (req.log) req.log.error(error);
      res.status(500).json({ message: error.message || 'Upload failed' });
      return;
    }
    res.json({ url: result?.secure_url });
  });

  fs.createReadStream(file.path).pipe(uploadStream);
};
