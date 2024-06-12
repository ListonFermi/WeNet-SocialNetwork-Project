import { Router } from 'express';
import adminController from '../controllers/adminController';
const router = Router();

router.post('/login', adminController.login);

router.get('/usermanagement', adminController.userManagement);



export default router;