import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const enquirySchema = z.object({
  customer: z.string().min(2).max(100),
  phone: z.string().min(8).max(20),
  email: z.string().email().optional().nullable().or(z.literal('')),
  description: z.string().max(2000).optional().nullable(),
  source: z.string().max(50).optional().nullable(),
  status: z.string().max(20).optional().nullable(),
});

export const categorySchema = z.object({
  name: z.string().min(2).max(100),
  desc: z.string().optional().nullable(),
  image: z.string().url().or(z.literal('')).optional().nullable(),
  slug: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
});

export const subCategorySchema = z.object({
  name: z.string().min(2).max(100),
  desc: z.string().optional().nullable(),
  image: z.string().url().or(z.literal('')).optional().nullable(),
  slug: z.string().optional().nullable(),
  categoryId: z.number().int().positive(),
});

export const tileSchema = z.object({
  name: z.string().min(2).max(100),
  image: z.string().url().or(z.literal('')),
  subCategoryId: z.number().int().positive(),
  size: z.string().min(1).max(100).optional().nullable().or(z.literal('')),
  finish: z.string().min(1).max(100).optional().nullable().or(z.literal('')),
  palette: z.string().optional().nullable(),
  thickness: z.string().optional().nullable(),
  desc: z.string().optional().nullable(),
  template: z.string().optional().nullable(),
  inStock: z.boolean().optional(),
});
