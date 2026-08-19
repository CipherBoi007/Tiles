"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPagination = exports.getPagination = void 0;
const getPagination = (req) => {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const rawLimit = parseInt(req.query.limit, 10) || 10;
    const limit = Math.min(Math.max(rawLimit, 1), 100);
    const searchRaw = typeof req.query.search === 'string' ? req.query.search : '';
    const search = searchRaw.trim().slice(0, 100);
    const skip = (page - 1) * limit;
    return { page, limit, search, skip };
};
exports.getPagination = getPagination;
const formatPagination = (data, totalItems, page, limit) => {
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
exports.formatPagination = formatPagination;
