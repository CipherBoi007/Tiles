import { Request } from 'express';

export const getPagination = (req: Request) => {
  const page = Math.max(parseInt(req.query.page as string, 10) || 1, 1);
  const rawLimit = parseInt(req.query.limit as string, 10) || 10;
  const limit = Math.min(Math.max(rawLimit, 1), 100);
  const searchRaw = typeof req.query.search === 'string' ? req.query.search : '';
  const search = searchRaw.trim().slice(0, 100);
  const skip = (page - 1) * limit;
  return { page, limit, search, skip };
};

export const formatPagination = (data: any[], totalItems: number, page: number, limit: number) => {
  return {
    data,
    pagination: {
      totalItems,
      totalPages: Math.ceil(totalItems / limit) || 1,
      currentPage: page,
      limit
    }
  };
};
