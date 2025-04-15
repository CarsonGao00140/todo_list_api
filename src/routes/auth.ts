import { Router } from 'express';
import validator from 'validator';

import { send, verify } from '../services/otp.ts';

const router = Router();

router.post('/otp/send', async (req, res) => {
    const email = req.body?.email;
    if (!email) {
        res.status(400).send({ error: "Missing required field: email" });
        return
    };
    if (!validator.isEmail(email)) {
        res.status(400).send({ error: "Invalid email format" });
        return
    };

    try {
        await send(email);
        res.send({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to send OTP" });
    }
});

router.post('/otp/verify', (req, res) => {
    const email = req.body?.email;
    const code = req.body?.code;
    if (!code || !email) {
        res.status(400).send({ error: "Missing required fields: email or code" });
        return
    };
    if (!validator.isEmail(email) || !/^[0-9]{6}$/.test(code)) {
        res.status(400).send({ error: "Invalid email or code format" });
        return
    };

    const isValid = verify(email, code);
    res.send({ data: { isValid } });
});

export default router
