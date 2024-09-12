import { Request, Response } from 'express'
import { sendEmail } from '../services/sendEmail'

export const sendSocialDataFile = async (req: Request, res: Response) => {
    try {
        const { filePath } = req.body
        const { id: userId } = req.user

        if (!filePath) {
            return res.status(400).json({ message: 'Se requiere la ruta del archivo' })
        }

        const sendEmailResponse = await sendEmail(userId, filePath)

        if (!sendEmailResponse) {
            return res.status(500).json({ message: 'Ocurrió un error al enviar el correo electrónico' })
        }

        res.status(200).json({ message: 'Datos enviados correctamente' })
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({ message: 'Ocurrió un error al enviar el correo electrónico' })
    }
}
