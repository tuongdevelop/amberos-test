import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
router.post('/register', userController.register);
router.post('/login', userController.login);
// Protected Routes
router.get('/profile/:id', authMiddleware, userController.getProfile);
router.put('/profile/:id', authMiddleware, userController.updateProfile);
export default router;
