import { Router } from 'express';
import { uploadJewelry } from '../controllers/adminController';
const router = Router();

// POST route to upload jewelry
router.post('/upload', uploadJewelry);

export default router;
