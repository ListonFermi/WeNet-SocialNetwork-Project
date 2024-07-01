import { Router } from 'express';
import adminController from '../controllers/adminController';
import { verifyAdmin } from '../middlewares/verifyAdmin';
const router = Router();

router.post('/login', adminController.login);

router.get('/usermanagement', verifyAdmin,  adminController.userManagement);

export default router;