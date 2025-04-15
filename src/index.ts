import express from 'express';

import login from './routes/login.ts';
import tasks from './routes/tasks.ts';
import auth from './middlewares/auth.ts';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/login', login);
app.use('/tasks', auth, tasks);

app.listen(port, () => {
    console.log(`Todo list backend listening on port ${port}`)
})
