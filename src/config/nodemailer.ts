import nodemailer, { TransportOptions } from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
    socketTimeout: 30000,
    connectionTimeout: 30000,
} as TransportOptions)

transporter.verify((error, success) => {
    if (error) {
        console.error('Error configuring transporter:', error)
    } else {
        console.log('Transporter is ready to send emails')
    }
})

export default transporter
