import { Request, Response } from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory } from './categoriesController';

export const getCollections = getCategories;
export const createCollection = createCategory;
export const updateCollection = updateCategory;
export const deleteCollection = deleteCategory;
