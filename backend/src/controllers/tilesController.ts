import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { getPagination, formatPagination } from '../utils/pagination';

export const getTiles = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, skip } = getPagination(req);
    
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { category: { contains: search, mode: 'insensitive' as const } },
      ]
    } : {};

    const [tiles, total] = await Promise.all([
      prisma.tile.findMany({
        where,
        skip,
        take: limit,
        include: { collection: true },
        orderBy: { id: 'desc' }
      }),
      prisma.tile.count({ where })
    ]);

    res.json(formatPagination(tiles, total, page, limit));
  } catch (error) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: 'Error fetching tiles', error });
  }
};

export const createTile = async (req: Request, res: Response) => {
  try {
    const tile = await prisma.tile.create({ data: req.body });
    await prisma.activity.create({
      data: { type: 'tile_added', title: 'Tile added', desc: `${tile.name} was added.` }
    });
    res.status(201).json(tile);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tile', error });
  }
};

export const updateTile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tile = await prisma.tile.update({ where: { id: Number(id) }, data: req.body });
    await prisma.activity.create({
      data: { type: 'tile_updated', title: 'Tile updated', desc: `${tile.name} was updated.` }
    });
    res.json(tile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tile', error });
  }
};

export const deleteTile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.tile.delete({ where: { id: Number(id) } });
    res.json({ message: 'Tile deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tile', error });
  }
};
