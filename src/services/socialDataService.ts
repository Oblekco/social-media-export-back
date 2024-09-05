import { RowDataPacket } from 'mysql2'
import dbConnection from '../config/mysql'
import { QueryResult } from '../interfaces/export'

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

        console.log('DATOS OBTENIDOS DESDE LA DB:', rows)

        return formatData(convertToRowDataPacket(mockData))
    } catch (error) {
        console.error('Error al obtener los datos:', error)
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

const convertToRowDataPacket = (data: any[]): RowDataPacket[] => {
    return data.map((item) => ({
        constructor: { name: 'RowDataPacket' },
        ...item,
    }))
}

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
