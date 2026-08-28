import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { getPagination, formatPagination } from '../utils/pagination';

export const getSubCategories = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, skip } = getPagination(req);
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
    
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' as const } },
        { desc: { contains: search, mode: 'insensitive' as const } },
      ];
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const [subCategories, total] = await Promise.all([
      prisma.subCategory.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
          _count: { select: { tiles: true } }
        },
        orderBy: { id: 'desc' }
      }),
      prisma.subCategory.count({ where })
    ]);

    const formatted = subCategories.map(sc => ({
      ...sc,
      tilesCount: sc._count.tiles
    }));

    res.json(formatPagination(formatted, total, page, limit));
  } catch (error) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: 'Error fetching subcategories', error });
  }
};

export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, desc, image, slug, categoryId } = req.body;
    const subCategoryData = {
      name: name?.trim() || 'Untitled Subcategory',
      desc: desc?.trim() || '',
      image: image || '',
      slug: slug?.trim() || name?.toLowerCase().replace(/\s+/g, '-'),
      categoryId: Number(categoryId)
    };
    const subCategory = await prisma.subCategory.create({ 
      data: subCategoryData,
      include: { category: true }
    });
    await prisma.activity.create({
      data: { type: 'subcategory', title: 'Subcategory created', desc: `${subCategory.name} was created.` }
    });
    res.status(201).json({ ...subCategory, tilesCount: 0 });
  } catch (error: any) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: error?.message || 'Error creating subcategory', error });
  }
};

export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, desc, image, slug, categoryId } = req.body;
    const subCategoryData: any = {
      name: name?.trim(),
      desc: desc?.trim(),
      image,
      slug: slug?.trim(),
    };
    if (categoryId) {
      subCategoryData.categoryId = Number(categoryId);
    }
    const subCategory = await prisma.subCategory.update({ 
      where: { id: Number(id) }, 
      data: subCategoryData,
      include: { category: true }
    });
    res.json(subCategory);
  } catch (error: any) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: error?.message || 'Error updating subcategory', error });
  }
};

export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.subCategory.delete({ where: { id: Number(id) } });
    res.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subcategory', error });
  }
};
