import { SentMessageInfo } from 'nodemailer'
import transporter from '../config/nodemailer'
import { getUserEmailById } from './authenticationService'
import dotenv from 'dotenv'
dotenv.config()

const NOTAS_FILENAME = 'notas.xlsx'
const NOTAS_FILE_PATH = 'notas.xlsx'
const NOTAS_CID = 'uniq-notas.xlsx'

async function getEmailById(userId: number): Promise<string | null> {
    try {
        const email = await getUserEmailById(userId.toString())
        return email
    } catch (error) {
        console.error('Error al obtener el correo electrónico del usuario:', error)
        return null
    }
}

async function sendEmailWithAttachment(
    email: string,
    id_user: { id: number },
    topic: string,
    subTopic: string,
): Promise<void> {
    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: 'Excel',
        attachments: [
            {
                filename: NOTAS_FILENAME,
                path: NOTAS_FILE_PATH,
                cid: NOTAS_CID,
            },
        ],
    }

    try {
        const info: SentMessageInfo = await transporter.sendMail(mailOptions)
        console.log('Correo electrónico enviado:', info.messageId)
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error)
    }
}

export async function sendEmail(id_user: { id: number }, topic: string, subTopic: string): Promise<void> {
    const email = await getEmailById(id_user.id)

    if (!email) {
        console.error('El correo electrónico del usuario no está disponible.')
        return
    }

    await sendEmailWithAttachment(email, id_user, topic, subTopic)
}
