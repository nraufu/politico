import express from 'express';
import { validate } from '../middlewares/validate';
import { User } from '../controllers/users';

const router = express.Router();

router.post('/signup', validate.createUser, User.createUser);

export default router;
