import { Request, Response } from 'express'
import { authenticateUser, decodedToken, findUserById } from '../services/authenticationService'

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const token = await authenticateUser(email, password)

        if (token) {
            res.json(token)
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' })
        }
    } catch (error) {
        console.error('Error al autenticar usuario:', error)
        res.status(500).json({ message: 'Ocurrió un error al autenticar usuario' })
    }
}

export const getUser = async (req: Request, res: Response) => {
    const authToken: string | undefined = req.headers.authorization

    try {
        if (authToken !== undefined) {
            const idUser = await decodedToken(authToken)

            const user = await findUserById(idUser)
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' })
            }

            res.json(user)
        } else {
            throw new Error('Token de autorización no proporcionado')
        }
    } catch (error) {
        console.error('Error al autenticar usuario:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}
