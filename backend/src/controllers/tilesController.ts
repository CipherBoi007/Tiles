import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { getPagination, formatPagination } from '../utils/pagination';

export const getTiles = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, skip } = getPagination(req);
    const subCategoryId = req.query.subCategoryId ? Number(req.query.subCategoryId) : undefined;
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' as const } },
        { finish: { contains: search, mode: 'insensitive' as const } },
        { size: { contains: search, mode: 'insensitive' as const } },
        { subCategory: { name: { contains: search, mode: 'insensitive' as const } } },
        { subCategory: { category: { name: { contains: search, mode: 'insensitive' as const } } } }
      ];
    }
    
    if (subCategoryId) {
      where.subCategoryId = subCategoryId;
    } else if (categoryId) {
      where.subCategory = { categoryId };
    }

    const [tiles, total] = await Promise.all([
      prisma.tile.findMany({
        where,
        skip,
        take: limit,
        include: { 
          subCategory: {
            include: {
              category: true
            }
          }
        },
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
    const { name, image, subCategoryId, size, finish, palette, thickness, desc, template, inStock } = req.body;
    const tileData = {
      name: name?.trim(),
      image: image || '',
      subCategoryId: Number(subCategoryId),
      size: size?.trim() || '',
      finish: finish?.trim() || palette?.trim() || '',
      palette: palette?.trim() || null,
      thickness: thickness?.trim() || null,
      desc: desc?.trim() || null,
      template: template || 'template1',
      inStock: inStock !== undefined ? Boolean(inStock) : true,
    };
    const tile = await prisma.tile.create({ 
      data: tileData,
      include: {
        subCategory: {
          include: { category: true }
        }
      }
    });
    await prisma.activity.create({
      data: { type: 'tile_added', title: 'Tile added', desc: `${tile.name} was added.` }
    });
    res.status(201).json(tile);
  } catch (error: any) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: error?.message || 'Error creating tile', error });
  }
};

export const updateTile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, image, subCategoryId, size, finish, palette, thickness, desc, template, inStock } = req.body;
    const tileData: any = {
      name: name?.trim(),
      image,
      size: size?.trim(),
      finish: finish?.trim() || palette?.trim(),
      palette: palette?.trim() || null,
      thickness: thickness?.trim() || null,
      desc: desc?.trim() || null,
      template: template || 'template1',
    };
    if (subCategoryId) {
      tileData.subCategoryId = Number(subCategoryId);
    }
    if (inStock !== undefined) {
      tileData.inStock = Boolean(inStock);
    }
    const tile = await prisma.tile.update({ 
      where: { id: Number(id) }, 
      data: tileData,
      include: {
        subCategory: {
          include: { category: true }
        }
      }
    });
    await prisma.activity.create({
      data: { type: 'tile_updated', title: 'Tile updated', desc: `${tile.name} was updated.` }
    });
    res.json(tile);
  } catch (error: any) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: error?.message || 'Error updating tile', error });
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
