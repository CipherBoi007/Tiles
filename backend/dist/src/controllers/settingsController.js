"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getSettings = async (req, res) => {
    try {
        let settings = await prisma_1.default.setting.findFirst();
        if (!settings) {
            settings = await prisma_1.default.setting.create({
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
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching settings', error });
    }
};
exports.getSettings = getSettings;
const updateSettings = async (req, res) => {
    try {
        let settings = await prisma_1.default.setting.findFirst();
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
        const updatedSettings = await prisma_1.default.setting.update({
            where: { id: settings.id },
            data: settingsData
        });
        res.json(updatedSettings);
    }
    catch (error) {
        if (req.log)
            req.log.error(error);
        res.status(500).json({ message: error?.message || 'Error updating settings', error });
    }
};
exports.updateSettings = updateSettings;
