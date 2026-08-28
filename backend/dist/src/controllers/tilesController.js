"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTile = exports.updateTile = exports.createTile = exports.getTiles = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const pagination_1 = require("../utils/pagination");
const getTiles = async (req, res) => {
    try {
        const { page, limit, search, skip } = (0, pagination_1.getPagination)(req);
        const subCategoryId = req.query.subCategoryId ? Number(req.query.subCategoryId) : undefined;
        const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { finish: { contains: search, mode: 'insensitive' } },
                { size: { contains: search, mode: 'insensitive' } },
                { subCategory: { name: { contains: search, mode: 'insensitive' } } },
                { subCategory: { category: { name: { contains: search, mode: 'insensitive' } } } }
            ];
        }
        if (subCategoryId) {
            where.subCategoryId = subCategoryId;
        }
        else if (categoryId) {
            where.subCategory = { categoryId };
        }
        const [tiles, total] = await Promise.all([
            prisma_1.default.tile.findMany({
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
            prisma_1.default.tile.count({ where })
        ]);
        res.json((0, pagination_1.formatPagination)(tiles, total, page, limit));
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: 'Error fetching tiles', error });
    }
};
exports.getTiles = getTiles;
const createTile = async (req, res) => {
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
        const tile = await prisma_1.default.tile.create({
            data: tileData,
            include: {
                subCategory: {
                    include: { category: true }
                }
            }
        });
        await prisma_1.default.activity.create({
            data: { type: 'tile_added', title: 'Tile added', desc: `${tile.name} was added.` }
        });
        res.status(201).json(tile);
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: error?.message || 'Error creating tile', error });
    }
};
exports.createTile = createTile;
const updateTile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, subCategoryId, size, finish, palette, thickness, desc, template, inStock } = req.body;
        const tileData = {
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
        const tile = await prisma_1.default.tile.update({
            where: { id: Number(id) },
            data: tileData,
            include: {
                subCategory: {
                    include: { category: true }
                }
            }
        });
        await prisma_1.default.activity.create({
            data: { type: 'tile_updated', title: 'Tile updated', desc: `${tile.name} was updated.` }
        });
        res.json(tile);
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: error?.message || 'Error updating tile', error });
    }
};
exports.updateTile = updateTile;
const deleteTile = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.tile.delete({ where: { id: Number(id) } });
        res.json({ message: 'Tile deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting tile', error });
    }
};
exports.deleteTile = deleteTile;
