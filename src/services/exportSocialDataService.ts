import { RowDataPacket } from 'mysql2'
import dbConnection from '../config/mysql'
import { QueryResult } from '../interfaces/export'

export const getSocialData = async (startDate: string, endDate: string, words: string[]): Promise<QueryResult[]> => {
    let connection

    try {
        connection = await dbConnection()

        const query = `
            SELECT *
            FROM social_data
            WHERE date BETWEEN ? AND ?
            AND headline LIKE ?
        `

        const word = words.length > 0 ? words[0] : ''
        const [rows, _fields] = await connection.execute<RowDataPacket[]>(query, [startDate, endDate, `%${word}%`])

        return formatData(rows)
    } catch (error) {
        throw new Error('Error al obtener los datos')
    }
}

const formatData = (rows: RowDataPacket[]): QueryResult[] => {
    return rows.map((row) => ({
        date: row.DATE,
        headline: row.HEADLINE,
        url: row.URL,
        openingText: row['OPENING TEXT'],
        hitSentence: row['HIT SENTENCE'],
        source: row.SOURCE,
        influencer: row.INFLUENCER,
        country: row.COUNTRY,
        reach: row.REACH,
        engagement: row.ENGAGEMENT,
        sentiment: row.SENTIMENT,
        keyPhrases: row['KEY PHRASES'],
        inputName: row['INPUT NAME'],
        twitterScreenName: row['TWITTER SCREEN NAME'],
        twitterFollowers: row['TWITTER FOLLOWERS'],
        twitterFollowing: row['TWITTER FOLLOWING'],
        state: row.STATE,
        city: row.CITY,
        views: row.VIEWS,
        likes: row.LIKES,
        replies: row.REPLIES,
        retweets: row.RETWEETS,
        comments: row.COMMENTS,
        shares: row.SHARES,
        reactions: row.REACTIONS,
        threads: row.THREADS,
    }))
}
