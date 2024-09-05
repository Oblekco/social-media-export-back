import express from 'express'
import { authenticateToken } from '../middlewares/authenticateToken'
import { generateSocialDataFile } from '../controllers/socialDataController'

const router = express.Router()

router.post('/', authenticateToken, generateSocialDataFile)

export default router
