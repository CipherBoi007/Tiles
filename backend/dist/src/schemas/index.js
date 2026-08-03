"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tileSchema = exports.enquirySchema = exports.loginSchema = void 0;
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
exports.tileSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    image: zod_1.z.string().url(),
    category: zod_1.z.string().min(2).max(50),
    size: zod_1.z.string().min(2).max(50),
    finish: zod_1.z.string().min(2).max(50),
    collectionId: zod_1.z.number().int().positive().optional().nullable(),
});
