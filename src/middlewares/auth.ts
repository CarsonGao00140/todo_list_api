import type { Request, Response, NextFunction } from "express";
import { verify } from "../services/token.ts";

export default async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace(/^Bearer\s/, '');
    const email = token && await verify(token);
    if (!email) {
        res.status(401).send({ error: "Unauthorized" });
        return
    };
    req.user = { email };
    next()
}
