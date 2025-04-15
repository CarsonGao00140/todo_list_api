const data: Record<string, Task[]> = {};

export const read = (email:string) => data[email] || [];

export const write = (email:string, tasks: Task[]) => {
    data[email] = tasks;
    return
}
