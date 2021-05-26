import express from 'express';
import { validate } from '../middlewares/validate';
import { verifyToken } from '../middlewares/verifyToken';
import { User } from '../controllers/users';

const router = express.Router();

router.post('/signup', validate.createUser, User.createUser);
router.post('/login', validate.login, User.login);
router.post('/reset', validate.reset, User.passwordReset);
router.get('/profile', verifyToken, User.profileInfo);

export default router;
