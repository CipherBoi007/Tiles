import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { getPagination, formatPagination } from '../utils/pagination';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, skip } = getPagination(req);
    
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { desc: { contains: search, mode: 'insensitive' as const } },
      ]
    } : {};

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: limit,
        include: { 
          subCategories: {
            include: {
              _count: { select: { tiles: true } }
            }
          },
          _count: { select: { subCategories: true } }
        },
        orderBy: { id: 'desc' }
      }),
      prisma.category.count({ where })
    ]);

    const formatted = categories.map(c => {
      const totalTiles = c.subCategories.reduce((acc, sub) => acc + (sub._count?.tiles || 0), 0);
      return {
        ...c,
        subCategoriesCount: c._count.subCategories,
        tilesCount: totalTiles
      };
    });

    res.json(formatPagination(formatted, total, page, limit));
  } catch (error) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, desc, image, slug, status } = req.body;
    const categoryData = {
      name: name?.trim() || 'Untitled Category',
      desc: desc?.trim() || '',
      image: image || '',
      slug: slug?.trim() || name?.toLowerCase().replace(/\s+/g, '-'),
      status: status || 'active'
    };
    const category = await prisma.category.create({ data: categoryData });
    await prisma.activity.create({
      data: { type: 'category', title: 'Category created', desc: `${category.name} was created.` }
    });
    res.status(201).json({ ...category, subCategoriesCount: 0, tilesCount: 0 });
  } catch (error: any) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: error?.message || 'Error creating category', error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, desc, image, slug, status } = req.body;
    const categoryData = {
      name: name?.trim(),
      desc: desc?.trim(),
      image,
      slug: slug?.trim(),
      status
    };
    const category = await prisma.category.update({ where: { id: Number(id) }, data: categoryData });
    res.json(category);
  } catch (error: any) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: error?.message || 'Error updating category', error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id: Number(id) } });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
