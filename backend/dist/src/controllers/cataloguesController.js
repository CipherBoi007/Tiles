"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCatalogue = exports.createCatalogue = exports.getCatalogues = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const pagination_1 = require("../utils/pagination");
const getCatalogues = async (req, res) => {
    try {
        const { page, limit, search, skip } = (0, pagination_1.getPagination)(req);
        const where = search ? {
            OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { desc: { contains: search, mode: 'insensitive' } },
            ]
        } : {};
        const [catalogues, total] = await Promise.all([
            prisma_1.default.catalogue.findMany({
                where,
                skip,
                take: limit,
                orderBy: { date: 'desc' }
            }),
            prisma_1.default.catalogue.count({ where })
        ]);
        res.json((0, pagination_1.formatPagination)(catalogues, total, page, limit));
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: 'Error fetching catalogues', error });
    }
};
exports.getCatalogues = getCatalogues;
const createCatalogue = async (req, res) => {
    try {
        const { title, desc, fileUrl } = req.body;
        const catalogueData = {
            title: title?.trim() || 'Untitled Catalogue',
            desc: desc?.trim() || '',
            fileUrl: fileUrl || '',
        };
        const catalogue = await prisma_1.default.catalogue.create({ data: catalogueData });
        await prisma_1.default.activity.create({
            data: { type: 'catalogue', title: 'Catalogue uploaded', desc: `${catalogue.title} PDF published.` }
        });
        res.status(201).json(catalogue);
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: error?.message || 'Error creating catalogue', error });
    }
};
exports.createCatalogue = createCatalogue;
const deleteCatalogue = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.catalogue.delete({ where: { id: Number(id) } });
        res.json({ message: 'Catalogue deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting catalogue', error });
    }
};
exports.deleteCatalogue = deleteCatalogue;
