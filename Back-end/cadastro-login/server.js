import express from 'express'
import publicRouter from './routers/public.js'
import privateRouter from './routers/private.js'
import auth from './middleware/auth.js'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())

app.use('/', publicRouter)
app.use('/', auth, privateRouter)
app.listen(3000, () => console.log("Servidor rodando🚀"))