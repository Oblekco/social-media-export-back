import { Request, Response } from 'express'

import { getSocialData, saveHistoryRecord, getSearchHistoryList } from '../services/socialDataService'
import { generateExcelFile } from '../services/excelService'
import { SearchRequestBody } from '../interfaces/export'

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

        const unescapedQuery = decodeURIComponent(booleanQuery)

        const socialData = await getSocialData(dateStart, dateEnd, unescapedQuery)
        const filePath = await generateExcelFile(socialData)

        return res.status(200).json({
            socialData,
            filePath,
        })
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' })
    }
}

export const listSearchHistory = async (req: Request, res: Response) => {
    try {
        const { id: userId } = req.user
        const { page = '1', limit = '10', order = 'ASC', filter = [] } = req.query

        const filterArray = Array.isArray(filter) ? filter : [filter]
        const filterStrings = filterArray.map((f) => String(f))

        const searchHistory = await getSearchHistoryList(
            userId,
            Number(page),
            Number(limit),
            String(order),
            filterStrings
        )

        res.status(200).json(searchHistory)
    } catch (error) {
        console.error('Error en el controlador:', error)
        res.status(500).json({ message: 'Error al obtener el historial de búsqueda' })
    }
}
