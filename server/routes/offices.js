import express from 'express';
import { validate } from '../middlewares/validate'
import { verifyToken } from '../middlewares/verifyToken';
import { Office } from '../controllers/offices';

const router = express.Router();

router.post('/', verifyToken, Office.createOffice);

export default router;
