import z from 'zod';
import schema from './schema';

declare global {
    namespace Express {
        interface Request {
            user: { email: string }
        }
    };

    type Task = z.infer<typeof schema>
}
