import { Request, Response } from 'express'

import { getSocialData, saveHistoryRecord, getSearchHistoryList } from '../services/socialDataService'
import { generateExcelFile } from '../services/excelService'
import { SearchRequestBody, SearchHistoryRequestBody } from '../interfaces/export'

export const generateSocialDataFile = async (req: Request, res: Response) => {
    try {
        const { dateStart, dateEnd, booleanQuery } = req.body as SearchRequestBody

        if (!dateStart || !dateEnd) {
            return res.status(400).json({ message: 'Se requiere una fecha de inicio y una fecha de fin' })
        }

        if (dateStart > dateEnd) {
            return res.status(400).json({ message: 'La fecha de inicio no puede ser mayor a la fecha de fin' })
        }

        if (!booleanQuery.length) {
            return res.status(400).json({ message: 'La query de busqueda es necesaria' })
        }

        const unescapedQuery = decodeURIComponent(booleanQuery)

        const socialData = await getSocialData(dateStart, dateEnd, unescapedQuery)
        const filePath = await generateExcelFile(socialData)

        return res.status(200).json({
            socialData,
            filePath,
        })
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({ message: 'Ocurrió un error al procesar la solicitud' })
    }
}

export const createSearchHistory = async (req: Request, res: Response) => {

    try {
        const data = req.body as SearchHistoryRequestBody
        const { id: userId } = req.user

        if (!data.booleanQuery)
            return res.status(400).json({ message: 'Se requiere una query de busqueda' })

        if (!data.title)
            return res.status(400).json({ message: 'Se requiere un título para el historial de búsqueda' })

        await saveHistoryRecord(userId, data)

        return res.status(201).json({ message: 'Historial de búsqueda guardado correctamente' })
    }
    catch (error) {
        console.error('Error', error)
        return res.status(500).json({ message: 'Ocurrió un error al procesar la solicitud' })
    }
}

export const listSearchHistory = async (req: Request, res: Response) => {
    try {
        const { id: userId } = req.user
        const { page = 1, limit = 10, order = 'ASC', filter = {}, search = {}, startDate, endDate } = req.query

        const parsedFilter = typeof filter === 'string' ? JSON.parse(filter) : filter
        const parsedSearch = typeof search === 'string' ? JSON.parse(search) : search

        const searchHistory = await getSearchHistoryList(
            userId,
            Number(page),
            Number(limit),
            order as string,
            parsedFilter as Record<string, string>,
            parsedSearch as Record<string, string>,
            startDate as string,
            endDate as string
        )

        res.status(200).json(searchHistory)
    } catch (error) {
        console.error('Error en el controlador:', error)
        res.status(500).json({ message: 'Ocurrió un error al obtener el historial de búsqueda' })
    }
}
