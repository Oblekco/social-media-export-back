import express from 'express'
import { authenticateToken } from '../middlewares/authenticateToken'
import { removeSocialDataFile } from '../controllers/fileController'

const router = express.Router()

router.delete('/remove', authenticateToken, removeSocialDataFile)

export default router
