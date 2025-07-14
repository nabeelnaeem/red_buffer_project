import express from 'express';

const router = express.Router();

router.post('/');
router.get('/');
router.get('/:id');
router.post('/:id');
router.delete('/:id');

export default router;