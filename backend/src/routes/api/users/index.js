import { Router } from 'express';
import { validateUser, createUser, getStatus, logoutUser } from './handlers';

const router = Router();

// curl -X localhost:8000/api/users/
router.post('/login', validateUser);
router.post('/register', createUser);
router.post('/logout', logoutUser);
router.get('/status', getStatus);


export default router;