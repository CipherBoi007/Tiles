"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentActivity = exports.getDashboardStats = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getDashboardStats = async (req, res) => {
    try {
        const totalTiles = await prisma_1.default.tile.count();
        const categoriesCount = await prisma_1.default.category.count();
        const subCategoriesCount = await prisma_1.default.subCategory.count();
        const newEnquiries = await prisma_1.default.enquiry.count({ where: { status: 'New' } });
        const cataloguesCount = await prisma_1.default.catalogue.count();
        const latestCatalogue = await prisma_1.default.catalogue.findFirst({ orderBy: { date: 'desc' } });
        res.json({
            totalTiles,
            tilesAddedThisWeek: 4,
            categories: categoriesCount,
            subCategories: subCategoriesCount,
            collections: categoriesCount, // fallback for backward compatibility
            newEnquiries,
            catalogues: cataloguesCount,
            latestCatalogue: latestCatalogue ? latestCatalogue.title : 'None'
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error });
    }
};
exports.getDashboardStats = getDashboardStats;
const getRecentActivity = async (req, res) => {
    try {
        const activity = await prisma_1.default.activity.findMany({ orderBy: { time: 'desc' }, take: 5 });
        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching activity', error });
    }
};
exports.getRecentActivity = getRecentActivity;
