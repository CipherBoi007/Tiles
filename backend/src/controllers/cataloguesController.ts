import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { getPagination, formatPagination } from '../utils/pagination';

export const getCatalogues = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, skip } = getPagination(req);
    
    const where = search ? {
      title: { contains: search, mode: 'insensitive' as const }
    } : {};

    const [catalogues, total] = await Promise.all([
      prisma.catalogue.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' }
      }),
      prisma.catalogue.count({ where })
    ]);

    res.json(formatPagination(catalogues, total, page, limit));
  } catch (error) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: 'Error fetching catalogues', error });
  }
};

export const createCatalogue = async (req: Request, res: Response) => {
  try {
    const { title, fileUrl, date } = req.body;
    
    if (!fileUrl) {
      return res.status(400).json({ message: 'File URL is required.' });
    }

    const catalogueData: any = {
      title: title?.trim() || 'Untitled Catalogue',
      fileUrl: String(fileUrl).trim(),
    };

    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        catalogueData.date = parsedDate;
      }
    }

    const catalogue = await prisma.catalogue.create({ data: catalogueData });
    
    try {
      await prisma.activity.create({
        data: { type: 'catalogue', title: 'Catalogue uploaded', desc: `${catalogue.title} PDF published.` }
      });
    } catch (actErr) {
      console.warn('Activity log entry warning:', actErr);
    }

    return res.status(201).json(catalogue);
  } catch (error: any) {
    if (req.log) req.log.error(error);
    console.error('Error in createCatalogue:', error);
    return res.status(500).json({ message: error?.message || 'Error creating catalogue', error });
  }
};

export const deleteCatalogue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.catalogue.delete({ where: { id: Number(id) } });
    res.json({ message: 'Catalogue deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting catalogue', error });
  }
};
