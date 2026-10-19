"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importExecutionSchema = exports.batchReviewSchema = exports.updateCandidateSchema = exports.startImportJobSchema = exports.catalogueSchema = exports.tileSchema = exports.subCategorySchema = exports.categorySchema = exports.enquirySchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.enquirySchema = zod_1.z.object({
    customer: zod_1.z.string().min(2).max(100),
    phone: zod_1.z.string().min(8).max(20),
    email: zod_1.z.string().email().optional().nullable().or(zod_1.z.literal('')),
    description: zod_1.z.string().max(2000).optional().nullable(),
    source: zod_1.z.string().max(50).optional().nullable(),
    status: zod_1.z.string().max(20).optional().nullable(),
});
exports.categorySchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    image: zod_1.z.string().url().or(zod_1.z.literal('')).optional().nullable(),
    slug: zod_1.z.string().optional().nullable(),
    division: zod_1.z.string().optional().nullable(),
    status: zod_1.z.string().optional().nullable(),
});
exports.subCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    image: zod_1.z.string().url().or(zod_1.z.literal('')).optional().nullable(),
    slug: zod_1.z.string().optional().nullable(),
    categoryId: zod_1.z.number().int().positive(),
});
exports.tileSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    image: zod_1.z.string().url().or(zod_1.z.literal('')),
    subCategoryId: zod_1.z.number().int().positive(),
});
exports.catalogueSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200),
    fileUrl: zod_1.z.string().min(1),
    date: zod_1.z.string().optional().nullable(),
});
exports.startImportJobSchema = zod_1.z.object({
    manufacturer: zod_1.z.enum(['Italake', 'Itaca', 'both']),
    maxProducts: zod_1.z.number().int().min(1).max(500).optional(),
    delayMs: zod_1.z.number().int().min(100).max(5000).optional(),
    validateImages: zod_1.z.boolean().optional(),
});
exports.updateCandidateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200).optional(),
    targetCategoryId: zod_1.z.number().int().positive().optional().nullable(),
    targetSubCategoryId: zod_1.z.number().int().positive().optional().nullable(),
    reviewStatus: zod_1.z.enum(['pending_review', 'approved', 'rejected', 'imported']).optional(),
});
exports.batchReviewSchema = zod_1.z.object({
    productIds: zod_1.z.array(zod_1.z.number().int().positive()).min(1),
    reviewStatus: zod_1.z.enum(['pending_review', 'approved', 'rejected']),
});
exports.importExecutionSchema = zod_1.z.object({
    manufacturer: zod_1.z.enum(['Italake', 'Itaca', 'both']).optional(),
    skipDuplicates: zod_1.z.boolean().optional(),
    updateExisting: zod_1.z.boolean().optional(),
    productIds: zod_1.z.array(zod_1.z.number().int().positive()).optional(),
});
