import { object, string, number, boolean } from 'zod';

export default object({
    id: string(),
    title: string().nonempty(),
    note: string().nonempty().optional(),
    dueDate: number().optional(),
    location: string().nonempty().optional(),
    category: string().nonempty().optional(),
    completed: boolean()
})
