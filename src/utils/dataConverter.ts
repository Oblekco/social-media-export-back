import { RowDataPacket } from 'mysql2'
import { QueryResult } from '../interfaces/export'

export const formatSocialMediaData = (rows: RowDataPacket[]): QueryResult[] => {
    return rows.map((row) => ({
        date: row.REDFECHA,
        url: row.REDURL,
        openingText: row.REDCONTENIDO,
        source: row.REDURL.includes('twitter.com') || row.REDURL.includes('x.com') ? 'Twitter/X' : 'Facebook',
        influencer: row.REDNOMBRE,
        country: row.COUNTRY || 'Mexico',
        reach: row.REDALCANCE,
        twitterScreenName: row.REDNOMBREUSUARIO,
        twitterFollowers: row.REDSEGUIDORES,
        likes: row.REDLIKES,
        retweets: row.REDRETWEETS,
        sentiment: row.REDTONALIDAD,
        // Los siguientes campos no existen en la base de datos
        twitterFollowing: row['TWITTER FOLLOWING'] || 'NO TWITTER FOLLOWING',
        hitSentence: row.HITSENTENCE || 'NO HIT SENTENCE',
        headline: row.HEADLINE || 'NO HEADLINE',
        engagement: row.ENGAGEMENT || 'NO ENGAGEMENT',
        reactions: row.REDTONALIDAD || 'NO REACTIONS',
        keyPhrases: row.KEYPHRASE || 'NO KEY PHRASES',
        inputName: row['INPUTNAME'] || 'NO INPUT NAME',
        city: row.CITY || 'NO CITY',
        state: row.STATE || 'NO STATE',
        views: row.VIEWS || 'NO VIEWS',
        replies: row.REPLIES || 'NO REPLIES',
        comments: row.COMMENTS || 'NO COMMENTS',
        shares: row.SHARES || 'NO SHARES',
        threads: row.THREADS || 'NO THREADS',
    }))
}
