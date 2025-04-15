import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    res.send({ data: [] })
});

export default router