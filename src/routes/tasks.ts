import { Router } from 'express';
import { array } from 'zod';
import { write, read } from '../services/data.ts';
import schema from '../types/schema.ts';

const router = Router();

router.get('/', (req, res) => {
    res.send({ data: read(req.user.email) })
});

router.put('/', (req, res) => {
    const tasks = req.body?.tasks;
    if (!tasks) {
        res.status(400).send({ error: "Missing required field: tasks" });
        return
    };

    const { success, data } = array(schema).safeParse(tasks);
    if (!success) {
        res.status(400).send({ error: "Invalid field format: tasks" });
        return
    };

    write(req.user.email, data);
    res.send({ message: "Tasks upsert successfully",  data })
});

export default router
