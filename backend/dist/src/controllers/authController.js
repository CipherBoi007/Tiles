"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("FATAL: JWT_SECRET is not defined in environment variables");
    }
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await prisma_1.default.adminUser.findUnique({ where: { email } });
        if (admin && (await bcryptjs_1.default.compare(password, admin.password))) {
            res.json({
                id: admin.id,
                email: admin.email,
                token: generateToken(admin.id),
            });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.login = login;
