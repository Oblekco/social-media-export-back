import express from 'express'
import { getUser, login } from '../controllers/authController'
import { authenticateToken } from '../middlewares/authenticateToken'

const router = express.Router()

router.post('/login', login)

router.get('/user', authenticateToken, getUser)

export default router
