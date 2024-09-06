import express from 'express'
import { authenticateToken } from '../middlewares/authenticateToken'
import { sendSocialDataFile } from '../controllers/sendEmailController'

const router = express.Router()

router.post('/', authenticateToken, sendSocialDataFile)

export default router
