"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategories = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const pagination_1 = require("../utils/pagination");
const getCategories = async (req, res) => {
    try {
        const { page, limit, search, skip } = (0, pagination_1.getPagination)(req);
        const where = search ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
            ]
        } : {};
        const [categories, total] = await Promise.all([
            prisma_1.default.category.findMany({
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
            prisma_1.default.category.count({ where })
        ]);
        const formatted = categories.map(c => {
            const totalTiles = (c.subCategories || []).reduce((acc, sub) => acc + (sub._count?.tiles || 0), 0);
            return {
                ...c,
                subCategoriesCount: c._count?.subCategories || 0,
                tilesCount: totalTiles
            };
        });
        res.json((0, pagination_1.formatPagination)(formatted, total, page, limit));
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};
exports.getCategories = getCategories;
const createCategory = async (req, res) => {
    try {
        const { name, image, slug, division, status } = req.body;
        const categoryData = {
            name: name?.trim() || 'Untitled Category',
            image: image || '',
            slug: slug?.trim() || name?.toLowerCase().replace(/\s+/g, '-'),
            division: division || 'tiles',
            status: status || 'active'
        };
        const category = await prisma_1.default.category.create({ data: categoryData });
        await prisma_1.default.activity.create({
            data: { type: 'category', title: 'Category created', desc: `${category.name} was created.` }
        });
        res.status(201).json({ ...category, subCategoriesCount: 0, tilesCount: 0 });
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: error?.message || 'Error creating category', error });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, slug, division, status } = req.body;
        const categoryData = {};
        if (name !== undefined)
            categoryData.name = name?.trim();
        if (image !== undefined)
            categoryData.image = image;
        if (slug !== undefined)
            categoryData.slug = slug?.trim();
        if (division !== undefined)
            categoryData.division = division;
        if (status !== undefined)
            categoryData.status = status;
        const category = await prisma_1.default.category.update({ where: { id: Number(id) }, data: categoryData });
        res.json(category);
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: error?.message || 'Error updating category', error });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.category.delete({ where: { id: Number(id) } });
        res.json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};
exports.deleteCategory = deleteCategory;
