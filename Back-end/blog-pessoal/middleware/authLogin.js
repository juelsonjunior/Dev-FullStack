import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authLogin = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            res.status(401).json({ message: 'Token inválido' });
        }

        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);

        const idUser = decoded.id;
    } catch (error) {
        res.status(500).json({
            message: 'Erro no servidor, tente novamente',
            error: `${error}`,
        });
    }
    next();
};

export default authLogin;
