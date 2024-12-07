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
        const { idArticle } = req.query;
        const articles = listAllDate('articles.json');

        if (idArticle && idArticle > 0) {
            const filterArticles = articles.find(
                (article) => article.id == idArticle
            );
            return res.json(filterArticles);
        } else {
            return res.json(articles);
        }
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

        if (email == '' || password == '') {
            return res
                .status(400)
                .json({ message: 'Obrigatorio preencher os campos' });
        }

        if (email != emailAd) {
            return res
                .status(400)
                .json({ message: 'Email de admin incorreto' });
        }
        if (password != passwordAd) {
            return res
                .status(400)
                .json({ message: 'Senha do admin incorreta' });
        }

        const token = jwt.sign({ id: idAd }, JWT_SECRET, {
            expiresIn: '10m',
        });
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({
            message: 'Erro no servidor, tente novamente',
            error,
        });
    }
});

export default router;
