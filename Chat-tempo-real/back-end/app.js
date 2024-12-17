import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:5173' } });
app.use(express.json());

const users = [];
io.on('connection', (socket) => {
    console.log('Usuario conectado', socket.id);

    socket.on('register-user', (data) => {
        const dataUser = {
            room: '',
            nameUser: data,
            createAt: new Date(),
        };

        users.push(dataUser);

        io.emit('login', users[0].nameUser)
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(msg);
    });
});

server.listen(3001, () => console.log('Servidor rodando...🚀'));
