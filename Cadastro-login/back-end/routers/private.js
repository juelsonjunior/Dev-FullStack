import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const router = express.Router()

router.get('/list-users', async (req, res) => {

    try {
        const users = await prisma.user.findMany();

        res.status(200).json({ message: "usuarios listados com sucesso", users })
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor, tente novamente", error: `${error}` })
    }
})

export default router

