import { Request } from 'express';

export const getPagination = (req: Request) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string || '';
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
