import { Router } from 'express';
import { getUser, validateUser, createUser } from './handlers';

const router = Router();

// curl -X localhost:8000/api/users/
router.post('/login', validateUser);
router.post('/register', createUser);
router.get('/:username', getUser);

export default router;