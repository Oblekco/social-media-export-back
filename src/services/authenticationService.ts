import jwt, { JwtPayload } from 'jsonwebtoken'
import dbProdConnection from '../config/mysql'
import { DecodedToken, User, UserToken } from '../interfaces/user'

export const authenticateUser = async (email: string, password: string): Promise<UserToken | null> => {
    try {

        const connection = await dbProdConnection()
        const [rows] = await connection.query(
            'SELECT id FROM SOCIAL_MEDIA_USERS WHERE email = ? AND password = ? LIMIT 1',
            [email, password]
        )

        if (Array.isArray(rows) && rows.length > 0) {
            const userId = (rows[0] as any).id
            return { token: generateToken(userId) } as UserToken
        } else {
            return null
        }
    } catch (error) {
        console.error('Error al autenticar usuario:', error)
        throw new Error('Error interno del servidor')
    }
}

const generateToken = (id: string): string => {
    const secretKey = process.env.SECRET
    if (!secretKey) {
        throw new Error('Error: Configuración de secret no encontrada.')
    }
    return jwt.sign({ id }, secretKey)
}

export const decodedToken = (token: string): DecodedToken => {
    try {
        let tokenWithoutBearer = token.replace('Bearer ', '')

        tokenWithoutBearer = tokenWithoutBearer.trim()

        const secretKey = process.env.SECRET
        if (!secretKey) {
            throw new Error('Error: Configuración de secret no encontrada.')
        }

        const decodedToken = jwt.verify(tokenWithoutBearer, secretKey) as JwtPayload

        const decodedData: DecodedToken = {
            id: decodedToken.id as number,
            iat: decodedToken.iat as number,
        }

        return decodedData
    } catch (error) {
        console.error('Error al verificar y decodificar el token:', error)
        throw error
    }
}

export const getUserEmailById = async (id: string): Promise<string | null> => {
    try {
        const connection = await dbProdConnection()
        const [rows] = await connection.query('SELECT email FROM SOCIAL_MEDIA_USERS WHERE id = ? LIMIT 1', [id])

        if (Array.isArray(rows) && rows.length > 0) {
            const email = (rows[0] as any).email

            return email
        } else {
            return null
        }
    } catch (error) {
        console.error('Error al verificar y decodificar el token:', error)
        throw error
    }
}
export const findUserById = async (id: DecodedToken): Promise<User | null> => {
    try {
        const connection = await dbProdConnection()
        const [rows] = await connection.query(
            'SELECT id, username, email FROM SOCIAL_MEDIA_USERS WHERE id = ? LIMIT 1',
            [id.id]
        )

        if (Array.isArray(rows) && rows.length > 0) {
            const userData = rows[0] as User
            return userData
        } else {
            return null
        }
    } catch (error) {
        throw new Error('Error al buscar usuario por ID en la base de datos')
    }
}
