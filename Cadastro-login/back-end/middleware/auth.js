import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const auth = (req, res, next) => {
    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({message: "Token Inválido"})
    }
    
    try {
        const decoded = jwt.verify(token.replace("Bearer ", ''), JWT_SECRET)

        req.userId = decoded.id
        console.log(decoded);
        
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor, tente novamente", error: `${error}` })
    }
    

    next()
}

export default auth