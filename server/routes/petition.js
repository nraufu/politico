import express from 'express';
import { validate } from '../middlewares/validate';
import { verifyToken } from '../middlewares/verifyToken';
import { User } from '../controllers/users';

const router = express.Router();

router.post('/', verifyToken, validate.petition, User.writePetition);

export default router;
