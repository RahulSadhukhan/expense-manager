import express from 'express';

import authMiddleware from '../../lib/authMiddleware';
import controller from "./controller";

const router = express.Router();

router.post('/', authMiddleware, controller.create);

router.get('/list', authMiddleware, controller.list);

router.get('/:id', authMiddleware, controller.find);

router.put('/:id', authMiddleware, controller.update);

router.delete('/:id', authMiddleware, controller.delete);

export default router;