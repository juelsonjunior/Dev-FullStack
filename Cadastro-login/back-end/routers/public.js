import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/cadastro', async (req, res) => {
    try {
        const user = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);

        const UserDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword,
            },
        });

        res.status(201).json(UserDB);
    } catch (error) {
        res.status(500).json({
            message: 'Erro no servidor, tente novamente',
            error: `${error}`,
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const dataUser = req.body;

        const user = await prisma.user.findUnique({
            where: { email: dataUser.email },
        });

        //verificando se o email existe no banco de dados
        if (!user) {
            return res.status(404).json({ message: 'usuario não encontrado' });
        }

        const isMath = await bcrypt.compare(dataUser.password, user.password);

        //Verificando se a senha vinod do usuario é mesma criptografada no banco com bcrypt
        if (!isMath) {
            return res.status(400).json({ message: 'Senha inválida' });
        }

        //gerando token com jwt
        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({
            message: 'Erro no servidor, tente novamente',
            error: `${error}`,
        });
    }
});

//juelson
//hs6bJsDMDDfk1NM8
//

export default router;
