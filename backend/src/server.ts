import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import pino from 'pino';

import path from 'path';

import routes from './routes/index';
import prisma from './lib/prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

app.use(pinoHttp({ logger }));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
].filter(Boolean) as string[];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy'));
    }
  },
  credentials: true,
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased to 1000 to prevent admin panel lockouts
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', apiLimiter);
app.use(express.json({ limit: '2mb' })); // Reduced from 10mb to prevent memory issues with JSON parsing
app.use(express.urlencoded({ limit: '2mb', extended: true }));

// Static route to serve local PDF catalogues directly with space/hyphen fallback
app.use('/catalogues', (req, res, next) => {
  try {
    const rawPath = decodeURIComponent(req.path);
    const publicCataloguesDir = path.join(__dirname, '../../SL-Tiles-Showroom/public/catalogues');
    const directFilePath = path.join(publicCataloguesDir, rawPath);

    if (fs.existsSync(directFilePath) && fs.statSync(directFilePath).isFile()) {
      return res.sendFile(directFilePath);
    }

    // Try fuzzy match (e.g. spaces converted to hyphens or timestamp separators)
    const normalizedName = rawPath.replace(/^\//, '');
    const files = fs.readdirSync(publicCataloguesDir);
    const matchedFile = files.find(f => 
      f.toLowerCase() === normalizedName.toLowerCase() ||
      f.replace(/[-_\s]+/g, '').toLowerCase() === normalizedName.replace(/[-_\s]+/g, '').toLowerCase()
    );

    if (matchedFile) {
      return res.sendFile(path.join(publicCataloguesDir, matchedFile));
    }
  } catch (err) {
    // Fallback to default express static handler
  }
  next();
}, express.static(path.join(__dirname, '../../SL-Tiles-Showroom/public/catalogues')));

app.use('/api', routes);

app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', message: 'Backend is healthy and connected to DB' });
  } catch (error) {
    logger.error(error as Error, 'Health check failed');
    res.status(503).json({ status: 'error', message: 'Database disconnected' });
  }
});

app.get('/api/ready', (req, res) => {
  res.json({ status: 'ok', message: 'Ready to accept traffic' });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.log) {
    req.log.error(err);
  } else {
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

  const gracefulShutdown = async (signal: string) => {
    logger.info(`Received ${signal}, shutting down gracefully...`);
    server.close(async () => {
      logger.info('HTTP server closed.');
      await prisma.$disconnect();
      logger.info('Database connection closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`ERROR: Port ${PORT} is already in use. Please kill the existing process.`);
      process.exit(1);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
}

export default app;
