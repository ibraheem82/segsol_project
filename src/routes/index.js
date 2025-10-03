// src/routes/index.js
import { Router } from 'express';
import pagesRouter from './pages.routes.js';
const router = Router();
router.use('/', pagesRouter);
export default router;

