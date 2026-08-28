"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tileSchema = exports.subCategorySchema = exports.categorySchema = exports.enquirySchema = exports.loginSchema = void 0;
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
    desc: zod_1.z.string().optional().nullable(),
    image: zod_1.z.string().url().or(zod_1.z.literal('')).optional().nullable(),
    slug: zod_1.z.string().optional().nullable(),
    status: zod_1.z.string().optional().nullable(),
});
exports.subCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    desc: zod_1.z.string().optional().nullable(),
    image: zod_1.z.string().url().or(zod_1.z.literal('')).optional().nullable(),
    slug: zod_1.z.string().optional().nullable(),
    categoryId: zod_1.z.number().int().positive(),
});
exports.tileSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    image: zod_1.z.string().url().or(zod_1.z.literal('')),
    subCategoryId: zod_1.z.number().int().positive(),
    size: zod_1.z.string().min(1).max(100).optional().nullable().or(zod_1.z.literal('')),
    finish: zod_1.z.string().min(1).max(100).optional().nullable().or(zod_1.z.literal('')),
    palette: zod_1.z.string().optional().nullable(),
    thickness: zod_1.z.string().optional().nullable(),
    desc: zod_1.z.string().optional().nullable(),
    template: zod_1.z.string().optional().nullable(),
    inStock: zod_1.z.boolean().optional(),
});
