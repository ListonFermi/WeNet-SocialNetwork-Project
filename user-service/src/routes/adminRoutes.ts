import { Router } from 'express';
import adminController from '../controllers/adminController';
const router = Router();

router.post('/login', adminController.login);


export default router;