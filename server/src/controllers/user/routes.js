import express from 'express';

import authMiddleware from '../../lib/authMiddleware';
import controller from "./controller";

const router = express.Router();

router.post('/', controller.create);

router.post('/login', controller.login);

router.get('/', authMiddleware, controller.me);

export default router;