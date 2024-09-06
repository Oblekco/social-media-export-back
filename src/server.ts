import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import socialDataRoutes from './routes/socialDataRoutes'
import sendEmailRoutes from './routes/sendEmailRoutes'

import { EventEmitter } from 'events'

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

app.use('/auth', authRoutes)

app.use('/search', socialDataRoutes)

app.use('/send', sendEmailRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
})
