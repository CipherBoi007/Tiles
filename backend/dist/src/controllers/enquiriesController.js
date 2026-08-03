"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnquiry = exports.updateEnquiryStatus = exports.createEnquiry = exports.getEnquiries = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const pagination_1 = require("../utils/pagination");
const getEnquiries = async (req, res) => {
    try {
        const { page, limit, search, skip } = (0, pagination_1.getPagination)(req);
        const where = search ? {
            OR: [
                { customer: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } }
            ]
        } : {};
        const [enquiries, total] = await Promise.all([
            prisma_1.default.enquiry.findMany({
                where,
                skip,
                take: limit,
                orderBy: { date: 'desc' }
            }),
            prisma_1.default.enquiry.count({ where })
        ]);
        res.json((0, pagination_1.formatPagination)(enquiries, total, page, limit));
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: 'Error fetching enquiries', error });
    }
};
exports.getEnquiries = getEnquiries;
const createEnquiry = async (req, res) => {
    try {
        const { customer, phone, email, description, source, status } = req.body;
        const enquiry = await prisma_1.default.enquiry.create({
            data: {
                customer,
                phone,
                email,
                description,
                source: source || 'Web',
                status: status || 'New',
            }
        });
        // We can also log this activity
        await prisma_1.default.activity.create({
            data: { type: 'enquiry', title: 'New Enquiry', desc: `Lead captured from ${customer}` }
        });
        res.status(201).json(enquiry);
    }
    catch (error) {
        console.error("Failed to create enquiry", error);
        res.status(500).json({ message: 'Error creating enquiry', error });
    }
};
exports.createEnquiry = createEnquiry;
const updateEnquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const enquiry = await prisma_1.default.enquiry.update({ where: { id: Number(id) }, data: { status } });
        await prisma_1.default.activity.create({
            data: { type: 'enquiry', title: 'Enquiry status updated', desc: `Enquiry status changed to ${status}` }
        });
        res.json(enquiry);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating enquiry', error });
    }
};
exports.updateEnquiryStatus = updateEnquiryStatus;
const deleteEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.enquiry.delete({ where: { id: Number(id) } });
        res.json({ message: 'Enquiry deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting enquiry', error });
    }
};
exports.deleteEnquiry = deleteEnquiry;
