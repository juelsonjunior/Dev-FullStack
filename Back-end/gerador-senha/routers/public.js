import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/list-passwords', async (req, res) => {
    try {
        const list = await prisma.listPass.findMany();

        res.json(list);
    } catch (error) {
        res.json({
            message: 'Erro: Houve um problema ao listar as senhas',
            error,
        });
    }
});

router.post('/insert-passwords', async (req, res) => {
    try {
        const dataPass = req.body.senha;

        const verifyPass = await prisma.listPass.findUnique({
            where: {
                senha: dataPass,
            },
        });

        if (verifyPass) {
            res.json({ message: 'Erro: Essa senha já foi salva' });
        } else {
            const insert = await prisma.listPass.create({
                data: {
                    senha: dataPass,
                },
            });
            res.json({ message: 'Senha salva com sucesso' });
        }
    } catch (error) {
        res.json({
            message: 'Erro: Houve um problema ao salvar a senha',
            error,
        });
    }
});

router.delete('/del-passwords/:id', async (req, res) => {
    try {
        const idpass = req.params.id.replace(':', '');

        const del = await prisma.listPass.delete({
            where: { id: idpass },
        });

        res.json({ message: 'senha eliminada com sucesso' });
    } catch (error) {
        res.json({
            message: 'Erro: Houve um problema ao deletar a senha',
            error,
        });
    }
});
export default router;
