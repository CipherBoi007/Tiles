import { Request, Response } from 'express';
import prisma from '../lib/prisma';

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const weekAgo = new Date(Date.now() - ONE_WEEK_MS);

    const [totalTiles, tilesAddedThisWeek, categories, subCategories, newEnquiries, catalogues, latestCatalogue] =
      await Promise.all([
        prisma.tile.count(),
        prisma.tile.count({ where: { createdAt: { gte: weekAgo } } }),
        prisma.category.count(),
        prisma.subCategory.count(),
        prisma.enquiry.count({ where: { status: 'New' } }),
        prisma.catalogue.count(),
        prisma.catalogue.findFirst({ orderBy: { date: 'desc' }, select: { title: true } }),
      ]);

    res.json({
      totalTiles,
      tilesAddedThisWeek,
      categories,
      subCategories,
      newEnquiries,
      catalogues,
      latestCatalogue: latestCatalogue?.title ?? 'None',
    });
  } catch (error) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
};

export const getRecentActivity = async (req: Request, res: Response) => {
  try {
    const activity = await prisma.activity.findMany({ orderBy: { time: 'desc' }, take: 5 });
    res.json(activity);
  } catch (error) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: 'Error fetching activity' });
  }
};
