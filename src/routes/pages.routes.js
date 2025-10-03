// src/routes/pages.routes.js (The fix is here)
import { Router } from 'express';
import { about, home, contact } from '../controllers/pages.controller.js'; // <-- CORRECTED IMPORT

const router = Router();

router.get('/', home);      // <-- Using 'home' function directly
router.get('/about', about);  // <-- Using 'about' function directly
router.get('/contact', contact);  // <-- Using 'about' function directly

export default router;