import { Router } from 'express';
import { createBrand, getBrand } from '../controllers/brandController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createBrand);
router.get('/', authMiddleware, getBrand);

export default router; 