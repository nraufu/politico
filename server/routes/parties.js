import express from 'express';
import { validate } from '../middlewares/validate';
import { Party } from '../controllers/parties';

const router = express.Router();

router.post('/', validate.party, Party.createParty);

export default router;
