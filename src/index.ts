import express from 'express';
import auth from './routes/auth.ts';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/auth', auth);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
