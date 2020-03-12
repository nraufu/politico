import express from 'express';
import { validate } from '../middlewares/validate';
import { User } from '../controllers/users';

const router = express.Router();

router.post('/signup', validate.createUser, User.createUser);
router.post('/login', validate.login, User.login);

export default router;
