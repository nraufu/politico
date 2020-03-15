import express from 'express';
import { validate } from '../middlewares/validate'
import { verifyToken } from '../middlewares/verifyToken';
import { Office } from '../controllers/offices';

const router = express.Router();

router.post('/', validate.office, verifyToken, Office.createOffice);
router.get('/', verifyToken, Office.getOffices);

export default router;
