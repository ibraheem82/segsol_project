import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import router from './routes/index.js';

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');
const isProd = process.env.NODE_ENV === 'production';

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(compression());
app.use(morgan(isProd ? 'combined' : 'dev'));

// Nunjucks setup
const viewsPath = path.join(__dirname, 'views');
const env = nunjucks.configure(viewsPath, {
  autoescape: true,
  express: app,
  noCache: !isProd,
  watch: !isProd,
});
app.set('views', viewsPath);
app.set('view engine', 'njk');

// Global asset helper
const ASSET_BASE = process.env.ASSET_BASE || '/asset';  // ✅ singular
const ASSET_VERSION =
  process.env.ASSET_VERSION || (isProd ? '1' : Date.now().toString());

env.addGlobal('asset', (p) => {
  const file = String(p).replace(/^\/*/, '');
  return `${ASSET_BASE}/${file}?v=${ASSET_VERSION}`;
});

// Make current path available in templates
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Static asset - serve from public/asset folder
app.use(
  '/asset',  // ✅ URL path (singular)
  express.static(path.join(root, 'public', 'asset'), {  // ✅ Physical path
    maxAge: isProd ? '7d' : 0,
    etag: isProd,
  })
);

// Routes
app.use(router);
app.use((req, res) => {
  res.status(404).render('pages/404.njk', {
    title: '404 - Page Not Found | SEGSOL',
    description: 'The page you are looking for could not be found.',
    location: process.env.ORG_LOCATION || 'Lagos',
    phone: process.env.ORG_PHONE || '+234-813-000-0000',
    email: process.env.ORG_EMAIL || 'info@segsol.com'
  });
});

export default app;