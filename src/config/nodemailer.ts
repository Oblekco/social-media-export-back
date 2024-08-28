import nodemailer, { TransportOptions } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },

    socketTimeout: 30000,
    connectionTimeout: 30000,
} as TransportOptions);

transporter.verify((error, success) => {
    if (error) {
        console.error('Error configuring transporter:', error);
    } else {
        console.log('Transporter is ready to send emails');
    }
});

export default transporter;
