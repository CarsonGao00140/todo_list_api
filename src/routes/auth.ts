import { Router } from 'express';
import validator from 'validator';

import { send } from '../services/otp.ts';

const router = Router();

router.post('/otp/send', async (req, res) => {
    const email = req.body?.email;
    if (!email) {
        res.status(400).send("Missing required field: email");
        return
    }
    if (!validator.isEmail(email)) {
        res.status(400).send("Invalid email format");
        return
    }

    await send(email);
    res.send("OTP sent");
});

router.post('/otp/verify', (req, res) => {
    res.send('This is the login route');
});

export default router;
