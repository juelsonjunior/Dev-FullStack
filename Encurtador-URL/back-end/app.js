import express from 'express';
import routerPublic from './src/routes/public.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 30001;

app.use(express.json());
app.use(cors());
app.use('/', routerPublic);

app.listen(port, () => console.log('Servidor rodando'));
