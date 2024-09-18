import express from 'express'
import { authenticateToken } from '../middlewares/authenticateToken'
import { generateSocialDataFile, listSearchHistory, createSearchHistory, getASingleSearchHistory } from '../controllers/socialDataController'

const router = express.Router()

router.post('/', authenticateToken, generateSocialDataFile)
router.post('/history', authenticateToken, createSearchHistory)
router.get('/history', authenticateToken, listSearchHistory)
router.get('/history/:id', authenticateToken, getASingleSearchHistory)


export default router
