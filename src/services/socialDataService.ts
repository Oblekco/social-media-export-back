import { RowDataPacket } from 'mysql2'
import dbConnection from '../config/mysql'
import { QueryResult, SearchHistoryRequestBody } from '../interfaces/export'
import { formatSocialMediaData } from '../utils/dataConverter'
import { convertBooleanQueryToSQLQuery } from '../utils/queryConverter'

export const getSocialData = async (
    dateStart: string,
    dateEnd: string,
    queryString: string
): Promise<QueryResult[]> => {
    let connection

    try {
        connection = await dbConnection()

        const sqlQuery = `
        SELECT *
        FROM intelica.INTELITE_ICAPSULAREDES
        WHERE INTELITE_ICAPSULAREDES.REDFECHA BETWEEN '${dateStart}' AND '${dateEnd}'
        AND (${convertBooleanQueryToSQLQuery(queryString)})
        `

        const [rows, _fields] = await connection.execute<RowDataPacket[]>(sqlQuery)
        return formatSocialMediaData(rows)
    } catch (error) {
        console.error('Error al obtener los registros:', error)
        throw new Error('Error al obtener los registros')
    }
}

export const saveHistoryRecord = async (userId: number, data: SearchHistoryRequestBody): Promise<void> => {
    let connection

    const { title, booleanQuery, isBooleanSearch, dateStart, dateEnd } = data

    try {
        connection = await dbConnection()

        const query = `
            INSERT INTO SOCIAL_MEDIA_SEARCH_HISTORY (user_id, date, search, is_boolean_search, title, date_start, date_end)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `

        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

        await connection.execute(query, [userId, currentDate, booleanQuery, isBooleanSearch ? 1 : 0, title, dateStart, dateEnd])
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
    dateStart?: string,
    dateEnd?: string
): Promise<{ data: RowDataPacket[]; totalResults: number }> => {
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

        const dateCondition = dateStart && dateEnd ? `date BETWEEN ? AND ?` : ''
        const dateValues = dateStart && dateEnd ? [dateStart, dateEnd] : []

        const conditions = [filterConditions, searchConditions, dateCondition].filter(Boolean).join(' AND ')

        // Consulta para obtener los datos paginados
        const dataQuery = `
            SELECT h.*, u.fullname
            FROM SOCIAL_MEDIA_SEARCH_HISTORY h
            JOIN SOCIAL_MEDIA_USERS u ON h.user_id = u.id
            WHERE h.user_id = ?
            ${conditions ? `AND ${conditions}` : ''}
            ORDER BY h.date ${validOrder}
            LIMIT ${limit} OFFSET ${offset}
        `

        // Consulta para obtener el total de resultados
        const totalQuery = `
            SELECT COUNT(*) as total
            FROM SOCIAL_MEDIA_SEARCH_HISTORY h
            JOIN SOCIAL_MEDIA_USERS u ON h.user_id = u.id
            WHERE h.user_id = ?
            ${conditions ? `AND ${conditions}` : ''}
        `

        const [dataRows] = await connection.execute<RowDataPacket[]>(dataQuery, [
            userId,
            ...filterValues,
            ...searchValues,
            ...dateValues,
        ])

        const [totalRows] = await connection.execute<RowDataPacket[]>(totalQuery, [
            userId,
            ...filterValues,
            ...searchValues,
            ...dateValues,
        ])

        const totalResults = totalRows[0]?.total || 0

        return { data: dataRows, totalResults }
    } catch (error) {
        console.error('Error al obtener el historial:', error)
        throw new Error('Ocurrió un error al obtener el historial de búsqueda')
    }
}
