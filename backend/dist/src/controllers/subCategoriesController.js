"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubCategory = exports.updateSubCategory = exports.createSubCategory = exports.getSubCategories = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const pagination_1 = require("../utils/pagination");
const getSubCategories = async (req, res) => {
    try {
        const { page, limit, search, skip } = (0, pagination_1.getPagination)(req);
        const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { desc: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (categoryId) {
            where.categoryId = categoryId;
        }
        const [subCategories, total] = await Promise.all([
            prisma_1.default.subCategory.findMany({
                where,
                skip,
                take: limit,
                include: {
                    category: true,
                    _count: { select: { tiles: true } }
                },
                orderBy: { id: 'desc' }
            }),
            prisma_1.default.subCategory.count({ where })
        ]);
        const formatted = subCategories.map(sc => ({
            ...sc,
            tilesCount: sc._count.tiles
        }));
        res.json((0, pagination_1.formatPagination)(formatted, total, page, limit));
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: 'Error fetching subcategories', error });
    }
};
exports.getSubCategories = getSubCategories;
const createSubCategory = async (req, res) => {
    try {
        const { name, desc, image, slug, categoryId } = req.body;
        const subCategoryData = {
            name: name?.trim() || 'Untitled Subcategory',
            desc: desc?.trim() || '',
            image: image || '',
            slug: slug?.trim() || name?.toLowerCase().replace(/\s+/g, '-'),
            categoryId: Number(categoryId)
        };
        const subCategory = await prisma_1.default.subCategory.create({
            data: subCategoryData,
            include: { category: true }
        });
        await prisma_1.default.activity.create({
            data: { type: 'subcategory', title: 'Subcategory created', desc: `${subCategory.name} was created.` }
        });
        res.status(201).json({ ...subCategory, tilesCount: 0 });
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: error?.message || 'Error creating subcategory', error });
    }
};
exports.createSubCategory = createSubCategory;
const updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, desc, image, slug, categoryId } = req.body;
        const subCategoryData = {
            name: name?.trim(),
            desc: desc?.trim(),
            image,
            slug: slug?.trim(),
        };
        if (categoryId) {
            subCategoryData.categoryId = Number(categoryId);
        }
        const subCategory = await prisma_1.default.subCategory.update({
            where: { id: Number(id) },
            data: subCategoryData,
            include: { category: true }
        });
        res.json(subCategory);
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: error?.message || 'Error updating subcategory', error });
    }
};
exports.updateSubCategory = updateSubCategory;
const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.subCategory.delete({ where: { id: Number(id) } });
        res.json({ message: 'Subcategory deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting subcategory', error });
    }
};
exports.deleteSubCategory = deleteSubCategory;
