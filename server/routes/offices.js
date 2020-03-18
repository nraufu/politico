import express from 'express';
import { validate } from '../middlewares/validate'
import { verifyToken } from '../middlewares/verifyToken';
import { Office } from '../controllers/offices';

const router = express.Router();

router.post('/', validate.office, verifyToken, Office.createOffice);
router.post('/:id/register', verifyToken, validate.paramValidation, validate.candidate, Office.candidateOffice);
router.patch('/:id', verifyToken, validate.paramValidation, validate.office, Office.editOffice);
router.get('/', verifyToken, Office.getOffices);
router.get('/:id', validate.paramValidation, verifyToken, Office.getOffice);
router.get('/:id/result', validate.paramValidation, verifyToken, Office.viewResults);
router.delete('/:id', validate.paramValidation, verifyToken, Office.deleteOffice);

export default router;
