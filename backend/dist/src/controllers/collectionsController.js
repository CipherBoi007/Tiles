"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollection = exports.updateCollection = exports.createCollection = exports.getCollections = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const pagination_1 = require("../utils/pagination");
const getCollections = async (req, res) => {
    try {
        const { page, limit, search, skip } = (0, pagination_1.getPagination)(req);
        const where = search ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
            ]
        } : {};
        const [collections, total] = await Promise.all([
            prisma_1.default.collection.findMany({
                where,
                skip,
                take: limit,
                include: { _count: { select: { tiles: true } } },
                orderBy: { id: 'desc' }
            }),
            prisma_1.default.collection.count({ where })
        ]);
        const formatted = collections.map(c => ({ ...c, tilesCount: c._count.tiles }));
        res.json((0, pagination_1.formatPagination)(formatted, total, page, limit));
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: 'Error fetching collections', error });
    }
};
exports.getCollections = getCollections;
const createCollection = async (req, res) => {
    try {
        const collection = await prisma_1.default.collection.create({ data: req.body });
        await prisma_1.default.activity.create({
            data: { type: 'collection', title: 'Collection created', desc: `${collection.name} was created.` }
        });
        res.status(201).json({ ...collection, tilesCount: 0 });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating collection', error });
    }
};
exports.createCollection = createCollection;
const updateCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await prisma_1.default.collection.update({ where: { id: Number(id) }, data: req.body });
        res.json(collection);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating collection', error });
    }
};
exports.updateCollection = updateCollection;
const deleteCollection = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.collection.delete({ where: { id: Number(id) } });
        res.json({ message: 'Collection deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting collection', error });
    }
};
exports.deleteCollection = deleteCollection;
