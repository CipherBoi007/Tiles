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
        const where = search ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { category: { contains: search, mode: 'insensitive' } },
            ]
        } : {};
        const [tiles, total] = await Promise.all([
            prisma_1.default.tile.findMany({
                where,
                skip,
                take: limit,
                include: { collection: true },
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
        const tile = await prisma_1.default.tile.create({ data: req.body });
        await prisma_1.default.activity.create({
            data: { type: 'tile_added', title: 'Tile added', desc: `${tile.name} was added.` }
        });
        res.status(201).json(tile);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating tile', error });
    }
};
exports.createTile = createTile;
const updateTile = async (req, res) => {
    try {
        const { id } = req.params;
        const tile = await prisma_1.default.tile.update({ where: { id: Number(id) }, data: req.body });
        await prisma_1.default.activity.create({
            data: { type: 'tile_updated', title: 'Tile updated', desc: `${tile.name} was updated.` }
        });
        res.json(tile);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating tile', error });
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
