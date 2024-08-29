import transporter from '../config/nodemailer'
import { getUserEmailById } from './authenticationService'
import dotenv from 'dotenv'
import * as fs from 'fs'

dotenv.config()

interface UserEmailResult {
    email: string | null
}

async function fetchUserEmailById(userId: number): Promise<UserEmailResult> {
    try {
        const email = await getUserEmailById(userId.toString())
        return { email }
    } catch (error) {
        throw new Error('Error al obtener el correo electrónico del usuario')
    }
}

async function sendEmailWithAttachment(email: string, fileName: string): Promise<boolean> {
    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: 'Excel',
        attachments: [
            {
                filename: 'social-media-exporter.xlsx',
                path: `./${fileName}`,
                cid: 'uniq-sme.xlsx',
            },
        ],
    }

    try {
        await transporter.sendMail(mailOptions)
        return true
    } catch (error) {
        throw new Error('Error al enviar el correo electrónico')
    }
}

async function removeAttachmentFile(fileName: string): Promise<void> {
    try {
        fs.unlink(fileName, (error: any) => {
            if (error) {
                throw new Error('Error al eliminar el archivo adjunto')
            }
        })
    } catch (error) {
        throw new Error('Error al eliminar el archivo adjunto')
    }
}

export async function sendEmail(userId: number, fileName: string): Promise<boolean> {
    const { email } = await fetchUserEmailById(userId)

    if (!email) {
        console.error('El correo electrónico del usuario no está disponible.')
        return false
    }

    try {
        await sendEmailWithAttachment(email, fileName)
        await removeAttachmentFile(fileName)

        return true
    } catch (error) {
        throw new Error('Error al enviar el correo electrónico')
    }
}
