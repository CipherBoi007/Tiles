import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id: number) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("FATAL: JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.adminUser.findUnique({ where: { email } });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        id: admin.id,
        email: admin.email,
        token: generateToken(admin.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createInitialAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const count = await prisma.adminUser.count();
    if (count === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      const admin = await prisma.adminUser.create({
        data: {
          email: 'admin@showroom.com',
          password: hashedPassword,
        },
      });
      res.status(201).json({ message: 'Initial admin created', email: admin.email });
    } else {
      res.status(400).json({ message: 'Admin already exists' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
