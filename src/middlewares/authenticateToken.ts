import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../interfaces/user'

dotenv.config()

declare module 'express-serve-static-core' {
    interface Request {
        user: User
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Token de autenticación no proporcionado' })
        }

        const secretKey = process.env.SECRET
        if (!secretKey) {
            throw new Error('Error: Configuración de secret no encontrada.')
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido' })
            }
            req.user = decoded as User
            next()
        })
    } catch (error) {
        console.error('Error al autenticar token:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}
