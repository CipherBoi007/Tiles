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

export const tileSchema = z.object({
  name: z.string().min(2).max(100),
  image: z.string().url(),
  category: z.string().min(2).max(50),
  size: z.string().min(2).max(50),
  finish: z.string().min(2).max(50),
  collectionId: z.number().int().positive().optional().nullable(),
});
