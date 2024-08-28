import { Request, Response } from 'express'

import { sendEmail } from '../services/sendEmail'
import { getSocialData } from '../services/exportSocialDataService'
import { generateExcelFile } from '../services/excelService'

export const exportSocialData = async (req: Request, res: Response) => {
    const fechaInicio: string = req.query.fechaInicio as string
    const fechaFin: string = req.query.fechaFin as string
    const email: string = req.query.email as string
    const currentUser = req.user

    try {
        const socialData: any[] = []

        const excel = await generateExcelFile(socialData)

        if (email) {
            sendEmail({ id: currentUser.id }, 'Exportar Social Data', 'Social Data')
        }

        res.download(excel)
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' })
    }
}
