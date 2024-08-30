import express from 'express'

const router = express.Router()

import { authenticateToken } from '../middlewares/authenticateToken'
import { exportSocialData } from '../controllers/exportSocialDataController'

router.post('/export/xlsx', authenticateToken, exportSocialData)

export default router
