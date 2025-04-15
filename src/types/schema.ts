import { object, string, number, boolean } from 'zod';

export default object({
    id: string(),
    title: string(),
    note: string().optional(),
    dueDate: number().optional(),
    location: string().optional(),
    category: string().optional(),
    completed: boolean()
})
