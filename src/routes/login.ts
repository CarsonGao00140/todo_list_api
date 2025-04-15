import { Router } from 'express';
import { object, string } from 'zod';

import { send, verify } from '../services/otp.ts';
import { issue } from '../services/token.ts';

const router = Router();

router.post('/otp/send', async (req, res) => {
    const email = req.body?.email;
    if (!email) {
        res.status(400).send({ error: "Missing required field: email" });
        return
    };

    const { success, data } = string().email().safeParse(email);
    if (!success) {
        res.status(400).send({ error: "Invalid field format: email" });
        return
    };

    try {
        await send(data);
        res.send({ message: "Code sent successfully" })
    } catch (error) {
        res.status(500).send({ error: "Failed to send code" })
    }
});

router.post('/otp/verify', async (req, res) => {
    const email = req.body?.email;
    const code = req.body?.code;
    if (!code || !email) {
        res.status(400).send({ error: "Missing required fields: email or code" });
        return
    };

    const { success, data } = string().email().safeParse(email);
    if (!success || !/^\d{6}$/.test(code)) {
        res.status(400).send({ error: "Invalid fields format: email or code" });
        return
    };

    if (!verify(data, code)) {
        res.status(400).send({ error: "Invalid or or expired code" });
        return
    };

    res.send({ data: { token: await issue(data) } })
});

export default router
