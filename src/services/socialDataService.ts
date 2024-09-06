import { RowDataPacket } from 'mysql2'
import dbConnection from '../config/mysql'
import { QueryResult } from '../interfaces/export'
import { formatSocialMediaData } from '../utils/dataConverter'

//! TEMPORAL: Se mockea respuesta de ejemplo hasta que se tenga acceso a los datos reales
const mockData = [
    {
        DATE: '2023-10-01',
        HEADLINE: 'Sample Headline 1',
        URL: 'http://example.com/1',
        'OPENING TEXT': 'This is the opening text for sample 1.',
        'HIT SENTENCE': 'This is a hit sentence for sample 1.',
        SOURCE: 'Source 1',
        INFLUENCER: 'Influencer 1',
        COUNTRY: 'Country 1',
        REACH: 1000,
        ENGAGEMENT: 100,
        SENTIMENT: 'Positive',
        'KEY PHRASES': 'key1, key2',
        'INPUT NAME': 'Input 1',
        'TWITTER SCREEN NAME': '@sample1',
        'TWITTER FOLLOWERS': 500,
        'TWITTER FOLLOWING': 100,
        STATE: 'State 1',
        CITY: 'City 1',
        VIEWS: 200,
        LIKES: 50,
        REPLIES: 10,
        RETWEETS: 5,
        COMMENTS: 20,
        SHARES: 15,
        REACTIONS: 30,
        THREADS: 2,
    },
    {
        DATE: '2023-10-02',
        HEADLINE: 'Sample Headline 2',
        URL: 'http://example.com/2',
        'OPENING TEXT': 'This is the opening text for sample 2.',
        'HIT SENTENCE': 'This is a hit sentence for sample 2.',
        SOURCE: 'Source 2',
        INFLUENCER: 'Influencer 2',
        COUNTRY: 'Country 2',
        REACH: 2000,
        ENGAGEMENT: 200,
        SENTIMENT: 'Neutral',
        'KEY PHRASES': 'key3, key4',
        'INPUT NAME': 'Input 2',
        'TWITTER SCREEN NAME': '@sample2',
        'TWITTER FOLLOWERS': 1000,
        'TWITTER FOLLOWING': 200,
        STATE: 'State 2',
        CITY: 'City 2',
        VIEWS: 400,
        LIKES: 100,
        REPLIES: 20,
        RETWEETS: 10,
        COMMENTS: 40,
        SHARES: 30,
        REACTIONS: 60,
        THREADS: 4,
    },
]

// ! TEMPORAL: Se convierte el array de objetos a un array de RowDataPacket para simular la respuesta de la base de datos
const convertToRowDataPacket = (data: any[]): RowDataPacket[] => {
    return data.map((item) => ({
        constructor: { name: 'RowDataPacket' },
        ...item,
    }))
}

export const getSocialData = async (startDate: string, endDate: string, sqlQuery: string): Promise<QueryResult[]> => {
    let connection

    try {
        connection = await dbConnection()

        const query = `
            SELECT QUECLAVE
            FROM INTELITE_IQUERYXML
            WHERE QUEFECHA BETWEEN ? AND ?
            AND QUENOMBRE LIKE ?
        `

        const word = sqlQuery.length > 0 ? sqlQuery[0] : ''
        const [rows, _fields] = await connection.execute<RowDataPacket[]>(query, [startDate, endDate, `%${word}%`])

        return formatSocialMediaData(convertToRowDataPacket(mockData))
    } catch (error) {
        console.error('Error al obtener los datos:', error)
        throw new Error('Error al obtener los datos')
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
        throw new Error('Error al guardar el historial')
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
        throw new Error('Error al obtener el historial')
    }
}
