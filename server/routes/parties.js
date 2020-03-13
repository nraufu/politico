import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { validate } from '../middlewares/validate';
import { Party } from '../controllers/parties';

const router = express.Router();

router.post('/', verifyToken, validate.party, Party.createParty);
router.get('/', verifyToken, Party.getParties);
router.get('/:id', verifyToken, validate.paramValidation, Party.getParty);
router.delete('/:id', verifyToken, validate.paramValidation, Party.deleteParty);

export default router;
