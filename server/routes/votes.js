import express from 'express';
import { validate } from '../middlewares/validate';
import { verifyToken } from '../middlewares/verifyToken';
import { Vote } from '../controllers/votes';

const router = express.Router();

router.post('/', verifyToken, validate.vote, Vote.vote);

export default router;
