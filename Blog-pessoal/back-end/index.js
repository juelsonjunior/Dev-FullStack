import express from 'express';
import routerPublic from './routers/public/public.js';
import routerPrivate from './routers/private/private.js';
import authLogin from './middleware/authLogin.js';
import cors from 'cors';

const app = express();
app.use(express.json({limit: "1KB"}));
app.use(cors());

app.use('/', routerPublic);
app.use('/', authLogin, routerPrivate);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
