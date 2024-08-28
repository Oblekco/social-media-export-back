import express from "express";

const router = express.Router();

import { authenticateToken } from "../middlewares/authenticateToken";
import { exportSocialData } from "../controllers/exportSocialDataController";

router.get("/export/mysql-to-xlsx", authenticateToken, exportSocialData);

export default router;
