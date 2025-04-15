import z from 'zod';
import schema from '../types/schema.ts';

type Task = z.infer<typeof schema>
const data: Record<string, Task[]> = {};

export const read = (email:string) => data[email] || [];

export const write = (email:string, tasks: Task[]) => {
    data[email] = tasks;
}
