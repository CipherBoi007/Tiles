"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const pino_http_1 = __importDefault(require("pino-http"));
const pino_1 = __importDefault(require("pino"));
const index_1 = __importDefault(require("./routes/index"));
const prisma_1 = __importDefault(require("./lib/prisma"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const logger = (0, pino_1.default)({ level: process.env.LOG_LEVEL || 'info' });
app.use((0, pino_http_1.default)({ logger }));
app.use((0, helmet_1.default)());
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', apiLimiter);
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));
app.use(express_1.default.json({ limit: '2mb' })); // Reduced from 10mb to prevent memory issues with JSON parsing
app.use(express_1.default.urlencoded({ limit: '2mb', extended: true }));
app.use('/api', index_1.default);
app.get('/api/health', async (req, res) => {
    try {
        await prisma_1.default.$queryRaw `SELECT 1`;
        res.json({ status: 'ok', message: 'Backend is healthy and connected to DB' });
    }
    catch (error) {
        logger.error(error, 'Health check failed');
        res.status(503).json({ status: 'error', message: 'Database disconnected' });
    }
});
app.get('/api/ready', (req, res) => {
    res.json({ status: 'ok', message: 'Ready to accept traffic' });
});
// Global error handler
app.use((err, req, res, next) => {
    if (req.log) {
        req.log.error(err);
    }
    else {
        console.error(err.stack || err);
    }
    res.status(err.status || 500).json({
        message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message || 'Internal Server Error',
    });
});
if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(PORT, () => {
        logger.info(`Server is running on http://localhost:${PORT}`);
    });
    const gracefulShutdown = async (signal) => {
        logger.info(`Received ${signal}, shutting down gracefully...`);
        server.close(async () => {
            logger.info('HTTP server closed.');
            await prisma_1.default.$disconnect();
            logger.info('Database connection closed.');
            process.exit(0);
        });
    };
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`ERROR: Port ${PORT} is already in use. Please kill the existing process.`);
            process.exit(1);
        }
        else {
            console.error('Server error:', err);
            process.exit(1);
        }
    });
}
exports.default = app;
