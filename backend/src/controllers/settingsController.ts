import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await prisma.setting.findFirst();
    if (!settings) {
      settings = await prisma.setting.create({
        data: {
          showroomName: 'Sri Lakshmi Tiles and Granite',
          logoUrl: '',
          whatsappNumber: '+91 98765 43210',
          emailAddress: 'contact@showroom.com',
          address: '123 Luxury Avenue, Design District, Mumbai, India',
        }
      });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error });
  }
};

export const updateSettings = async (req: Request, res: Response): Promise<any> => {
  try {
    let settings = await prisma.setting.findFirst();
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }
    const { showroomName, logoUrl, whatsappNumber, emailAddress, address } = req.body;
    const settingsData = {
      ...(showroomName && { showroomName: showroomName.trim() }),
      ...(logoUrl && { logoUrl }),
      ...(whatsappNumber && { whatsappNumber: whatsappNumber.trim() }),
      ...(emailAddress && { emailAddress: emailAddress.trim() }),
      ...(address && { address: address.trim() }),
    };
    const updatedSettings = await prisma.setting.update({
      where: { id: settings.id },
      data: settingsData
    });
    res.json(updatedSettings);
  } catch (error: any) {
    if (req.log) req.log.error(error);
    res.status(500).json({ message: error?.message || 'Error updating settings', error });
  }
};
