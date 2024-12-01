import express from 'express';
import jwt from 'jsonwebtoken';
import { listAllDate } from '../../utils.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const dateAdmin = {
    idAd: 1,
    emailAd: 'a',
    passwordAd: 'a',
};

router.get('/list-articles', (req, res) => {
    try {
        const articles = listAllDate('articles.json');
        res.json(articles);
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao servidor, listar artigos',
            error,
        });
    }
});

router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const { idAd, emailAd, passwordAd } = dateAdmin;

        if (email != emailAd) {
            return res.json({ message: 'Email de admin incorreto' });
        }
        if (password != passwordAd) {
            return res.json({ message: 'Senha do admin incorreta' });
        }

        const token = jwt.sign({ id: idAd }, JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({
            message: 'Erro no servidor, tente novamente',
            error,
        });
    }
});

export default router;
