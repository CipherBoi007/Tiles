import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalTiles = await prisma.tile.count();
    const collectionsCount = await prisma.collection.count();
    const newEnquiries = await prisma.enquiry.count({ where: { status: 'New' } });
    const cataloguesCount = await prisma.catalogue.count();
    const latestCatalogue = await prisma.catalogue.findFirst({ orderBy: { date: 'desc' } });

    res.json({
      totalTiles,
      tilesAddedThisWeek: 4, // Simplified mock value or add date filters
      collections: collectionsCount,
      collectionsAddedThisMonth: 1, // Simplified mock value
      newEnquiries,
      catalogues: cataloguesCount,
      latestCatalogue: latestCatalogue ? latestCatalogue.title : 'None'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error });
  }
};

export const getRecentActivity = async (req: Request, res: Response) => {
  try {
    const activity = await prisma.activity.findMany({ orderBy: { time: 'desc' }, take: 5 });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity', error });
  }
};
