import { RowDataPacket } from 'mysql2'
import dbConnection from '../config/mysql'
import { QueryResult } from '../interfaces/export'
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
    search: string,
    isBooleanSearch: boolean = true
): Promise<void> => {
    let connection

    try {
        connection = await dbConnection()

        const query = `
            INSERT INTO SOCIAL_MEDIA_SEARCH_HISTORY (user_id, search, is_boolean_search, date)
            VALUES (?, ?, ?, ?)
        `

        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

        await connection.execute(query, [userId, search, isBooleanSearch ? 1 : 0, currentDate])
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
    filter: string[]
): Promise<RowDataPacket[]> => {
    let connection

    try {
        connection = await dbConnection()

        const validOrder = order.toUpperCase() === 'ASC' || order.toUpperCase() === 'DESC' ? order.toUpperCase() : 'ASC'
        const offset = (page - 1) * limit

        const filterConditions = filter.map((term) => `search LIKE ?`).join(' AND ')
        const filterValues = filter.map((term) => `%${term}%`)

        const query = `
            SELECT *
            FROM SOCIAL_MEDIA_SEARCH_HISTORY
            WHERE user_id = ?
            ${filterConditions ? `AND ${filterConditions}` : ''}
            ORDER BY date ${validOrder}
            LIMIT ${limit} OFFSET ${offset}
        `

        const [rows, _fields] = await connection.execute<RowDataPacket[]>(query, [userId, ...filterValues])

        return rows
    } catch (error) {
        console.error('Error al obtener el historial:', error)
        throw new Error('Ocurrió un error al obtener el historial de busqueda')
    }
}
