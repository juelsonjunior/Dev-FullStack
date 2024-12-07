import express from 'express';
import allRouters from './src/routes/route.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/', allRouters)

app.listen(3000, () => console.log(`Servidor rodandoooo🚀`))

//juniorX
//9HKZ7mKeGmV0cJA