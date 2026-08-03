import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { getPagination, formatPagination } from '../utils/pagination';

export const getCollections = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, skip } = getPagination(req);
    
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
      ]
    } : {};

    const [collections, total] = await Promise.all([
      prisma.collection.findMany({
        where,
        skip,
        take: limit,
        include: { _count: { select: { tiles: true } } },
        orderBy: { id: 'desc' }
      }),
      prisma.collection.count({ where })
    ]);

    const formatted = collections.map(c => ({ ...c, tilesCount: c._count.tiles }));
    res.json(formatPagination(formatted, total, page, limit));
  } catch (error) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: 'Error fetching collections', error });
  }
};

export const createCollection = async (req: Request, res: Response) => {
  try {
    const collection = await prisma.collection.create({ data: req.body });
    await prisma.activity.create({
      data: { type: 'collection', title: 'Collection created', desc: `${collection.name} was created.` }
    });
    res.status(201).json({ ...collection, tilesCount: 0 });
  } catch (error) {
    res.status(500).json({ message: 'Error creating collection', error });
  }
};

export const updateCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const collection = await prisma.collection.update({ where: { id: Number(id) }, data: req.body });
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Error updating collection', error });
  }
};

export const deleteCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.collection.delete({ where: { id: Number(id) } });
    res.json({ message: 'Collection deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting collection', error });
  }
};
