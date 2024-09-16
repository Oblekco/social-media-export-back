import { RowDataPacket } from 'mysql2'
import dbConnection from '../config/mysql'
import { QueryResult, SearchHistoryRequestBody } from '../interfaces/export'
import { formatSocialMediaData } from '../utils/dataConverter'
import { convertBooleanQueryToSQLQuery } from '../utils/queryConverter'

export const getSocialData = async (
    startDate: string,
    endDate: string,
    queryString: string
): Promise<QueryResult[]> => {
    let connection

    try {
        connection = await dbConnection()

        const sqlQuery = `
        SELECT *
        FROM intelica.INTELITE_ICAPSULAREDES
        WHERE INTELITE_ICAPSULAREDES.REDFECHA BETWEEN '${startDate}' AND '${endDate}'
        AND (${convertBooleanQueryToSQLQuery(queryString)})
        `

        const [rows, _fields] = await connection.execute<RowDataPacket[]>(sqlQuery)
        return formatSocialMediaData(rows)
    } catch (error) {
        console.error('Error al obtener los registros:', error)
        throw new Error('Error al obtener los registros')
    }
}

export const saveHistoryRecord = async (
    userId: number,
    data: SearchHistoryRequestBody
): Promise<void> => {
    let connection

    const { title, booleanQuery, isBooleanSearch } = data

    try {
        connection = await dbConnection()

        const query = `
            INSERT INTO SOCIAL_MEDIA_SEARCH_HISTORY (user_id, date, search, is_boolean_search, title)
            VALUES (?, ?, ?, ?, ?)
        `

        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

        await connection.execute(query, [userId, currentDate, booleanQuery, isBooleanSearch ? 1 : 0, title])
    } catch (error) {
        console.error('Error al guardar el historial:', error)
        throw new Error('Ocurrió un error al guardar el historial')
    }
}

export const getSearchHistoryList = async (
    userId: number,
    page: number,
    limit: number,
    order: string,
    filter: Record<string, string>,
    search: Record<string, string>,
    startDate?: string,
    endDate?: string
): Promise<RowDataPacket[]> => {
    let connection

    try {
        connection = await dbConnection()

        const validOrder = order.toUpperCase() === 'ASC' || order.toUpperCase() === 'DESC' ? order.toUpperCase() : 'ASC'
        const offset = (page - 1) * limit

        const filterConditions = Object.keys(filter)
            .map((key) => `${key} = ?`)
            .join(' AND ')
        const filterValues = Object.values(filter)

        const searchConditions = Object.keys(search)
            .map((key) => `${key} LIKE ?`)
            .join(' AND ')
        const searchValues = Object.values(search).map((value) => `%${value}%`)

        const dateCondition = startDate && endDate ? `date BETWEEN ? AND ?` : ''
        const dateValues = startDate && endDate ? [startDate, endDate] : []

        const conditions = [filterConditions, searchConditions, dateCondition].filter(Boolean).join(' AND ')

        const query = `
            SELECT h.*, u.fullname
            FROM SOCIAL_MEDIA_SEARCH_HISTORY h
            JOIN SOCIAL_MEDIA_USERS u ON h.user_id = u.id
            WHERE h.user_id = ?
            ${conditions ? `AND ${conditions}` : ''}
            ORDER BY h.date ${validOrder}
            LIMIT ${limit} OFFSET ${offset}
        `

        const [rows, _fields] = await connection.execute<RowDataPacket[]>(query, [
            userId,
            ...filterValues,
            ...searchValues,
            ...dateValues,
        ])

        return rows
    } catch (error) {
        console.error('Error al obtener el historial:', error)
        throw new Error('Ocurrió un error al obtener el historial de busqueda')
    }
}
