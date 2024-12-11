import express from 'express';
import { generateShortUrl } from '../utils/short-url.js';
import { isvalidUrl } from '../utils/url-valid.js';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/list-url', async (req, res) => {
    try {
        const listUrls = await prisma.urls.findMany();
        res.status(200).json(listUrls);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar urls', error });
    }
});

router.post('/short-url', async (req, res) => {
    try {
        const { url, codPerson } = req.body;
        const generateShort = codPerson != '' ? codPerson : generateShortUrl();

        if (url == '') {
            return res
                .status(400)
                .json({ message: 'Precisa preencher o campo URL' });
        }

        const validURL = isvalidUrl(url);

        if (!validURL) {
            return res
                .status(400)
                .json({ message: 'URl invalida! tente uma url valida' });
        }

        const urlDuplicated = await prisma.urls.findMany({
            where: {
                originUrl: url,
            },
        });

        if (urlDuplicated.length > 0) {
            return res.status(200).json({
                message: `Url já foi encurtada link encurtado abaixo`,
                dataDuplicated: `${process.env.DOMAIN}${urlDuplicated[0].shortUrl}`,
            });
        }

        const insertUrl = await prisma.urls.create({
            data: {
                originUrl: url,
                shortUrl: generateShort,
                acessCount: 0,
            },
        });

        if (!insertUrl) {
            return res.status(400).json({ message: 'Falha ao encurtar a url' });
        }

        res.status(201).json({
            message: `${process.env.DOMAIN}${insertUrl.shortUrl}`,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao encurtar a url', error });
    }
});

router.get('/:url', async (req, res) => {
    try {
        const url = req.params.url;

        const searchUrl = await prisma.urls.findMany({
            where: { shortUrl: url },
        });
        if (searchUrl.length === 0) {
            return res
                .status(404)
                .json({ message: 'Url não encontrada verifica a url' });
        }

        const update = await prisma.urls.update({
            where: {
                id: searchUrl[0].id,
            },
            data: {
                acessCount: { increment: 1 },
            },
        });

        if (update.length != 0) {
            const originUrl = searchUrl[0].originUrl;
            res.redirect(originUrl);
        } else {
            res.status(400).json({
                message: 'Falha ao redirecionar para a url de destino',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error ao contar os acessos a url:',
            error,
        });
    }
});

router.post('/estatistic-url', async (req, res) => {
    try {
        const { url } = req.body;

        if (url == '') {
            return res
                .status(400)
                .json({ message: 'Precisa preencher o campo URL' });
        }

        const validURL = isvalidUrl(url);

        if (!validURL) {
            return res
                .status(400)
                .json({ message: 'URl invalida! tente uma url valida' });
        }

        const estatistic = await prisma.urls.findMany({
            where: {
                shortUrl: url.split('/')[3],
            },
        });

        if (estatistic.length == 0) {
            return res
                .status(404)
                .json({ message: 'URL não encontrada tente outra' });
        }

        res.status(200).json({ message: estatistic[0].acessCount });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao verificar estatistica da url',
            error,
        });
    }
});

router.post('/contact-send', async (req, res) => {
    try {
        const { email, name, message } = req.body;

        if (name == '') {
            return res
                .status(400)
                .json({ message: 'Precisa preencher o campo nome' });
        }

        if (email == '') {
            return res
                .status(400)
                .json({ message: 'Precisa preencher o campo email' });
        }

        if (message == '') {
            return res
                .status(400)
                .json({ message: 'Precisa preencher o campo mensagem' });
        }

        const configEmail = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const infoEmail = await configEmail.sendMail({
            from: `Encurtador de URL < ${email} >`,
            to: process.env.EMAIL_USER,
            subject: `Mensagem de ${name}`,
            replyTo: email,
            text: message,
            html: `
                <h4>Ola(a) <strong>Juelson</strong>,</h4>
                <p>${message}</p>
            `,
        });

        res.status(200).json({
            message: `Mensagem enviada com sucesso`,
        });
    } catch (error) {
        res.status(500).json({ message: `Falha ao enviar email ${error}` });
    }
});
export default router;
