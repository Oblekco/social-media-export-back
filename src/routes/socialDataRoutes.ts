import express from 'express'
import { authenticateToken } from '../middlewares/authenticateToken'
import { generateSocialDataFile, listSearchHistory } from '../controllers/socialDataController'

const router = express.Router()

router.post('/', authenticateToken, generateSocialDataFile)
router.get('/', authenticateToken, listSearchHistory)

export default router
