import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { getPagination, formatPagination } from '../utils/pagination';

export const getEnquiries = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, skip } = getPagination(req);
    
    const where = search ? {
      OR: [
        { customer: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
        { phone: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' }
      }),
      prisma.enquiry.count({ where })
    ]);

    res.json(formatPagination(enquiries, total, page, limit));
  } catch (error) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: 'Error fetching enquiries', error });
  }
};

export const createEnquiry = async (req: Request, res: Response) => {
  try {
    const { customer, phone, email, description, source, status } = req.body;
    
    const enquiry = await prisma.enquiry.create({
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
    await prisma.activity.create({
      data: { type: 'enquiry', title: 'New Enquiry', desc: `Lead captured from ${customer}` }
    });

    res.status(201).json(enquiry);
  } catch (error) {
    console.error("Failed to create enquiry", error);
    res.status(500).json({ message: 'Error creating enquiry', error });
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const enquiry = await prisma.enquiry.update({ where: { id: Number(id) }, data: { status } });
    await prisma.activity.create({
      data: { type: 'enquiry', title: 'Enquiry status updated', desc: `Enquiry status changed to ${status}` }
    });
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: 'Error updating enquiry', error });
  }
};

export const deleteEnquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.enquiry.delete({ where: { id: Number(id) } });
    res.json({ message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting enquiry', error });
  }
};
