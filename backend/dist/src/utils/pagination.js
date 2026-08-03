"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPagination = exports.getPagination = void 0;
const getPagination = (req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
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
