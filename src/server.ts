import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cron from 'node-cron'
import { EventEmitter } from 'events'
import authRoutes from './routes/authRoutes'
import socialDataRoutes from './routes/socialDataRoutes'
import sendEmailRoutes from './routes/sendEmailRoutes'
import fileRoutes from './routes/fileRoutes'
import { fileRemover } from './utils/fileRemover'


EventEmitter.defaultMaxListeners = 15

dotenv.config()

const app = express()

const cors = require('cors')

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
)

app.use(express.json())

app.use('/docs', express.static(path.join(__dirname, '../docs')))

app.use('/auth', authRoutes)

app.use('/search', socialDataRoutes)

app.use('/send', sendEmailRoutes)

app.use('/file', fileRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
})

cron.schedule('0 0 * * *', () => {
    fileRemover()
})
