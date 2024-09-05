import { Request, Response } from 'express'

import { getSocialData, saveHistoryRecord } from '../services/socialDataService'
import { generateExcelFile } from '../services/excelService'
import { SearchRequestBody } from '../interfaces/export'
import { convertBooleanQueryToSQLQuery } from '../utils/queryConverter'

export const generateSocialDataFile = async (req: Request, res: Response) => {
    try {
        const { dateStart, dateEnd, booleanQuery } = req.body as SearchRequestBody
        const { id: userId } = req.user

        if (!dateStart || !dateEnd) {
            return res.status(400).json({ error: 'Se requiere una fecha de inicio y una fecha de fin.' })
        }

        if (dateStart > dateEnd) {
            return res.status(400).json({ error: 'La fecha de inicio no puede ser mayor a la fecha de fin.' })
        }

        if (!booleanQuery.length) {
            return res.status(400).json({ error: 'La query de busqueda es necesaria' })
        }

        await saveHistoryRecord(userId, booleanQuery)

        // ? Pedir al front que utilice la función encodeURIComponent para escapar la query antes de enviarla
        const unescapedQuery = decodeURIComponent(booleanQuery)

        const sqlQuery = convertBooleanQueryToSQLQuery(unescapedQuery)

        const socialData = await getSocialData(dateStart, dateEnd, sqlQuery)

        const filePath = await generateExcelFile(socialData)

        console.log('ARCHIVO GENERADO:', filePath)

        return res.status(200).json({
            socialData,
            filePath,
        })
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' })
    }
}
