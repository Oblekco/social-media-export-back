import { RowDataPacket } from 'mysql2'
import { QueryResult } from '../interfaces/export'

export const formatSocialMediaData = (rows: RowDataPacket[]): QueryResult[] => {
    return rows.map((row) => ({
        date: row.REDFECHA,
        headline: row.HEADLINE || 'NO HEADLINE',
        url: row.REDURL,
        openingText: row.REDCONTENIDO,
        hitSentence: row['HIT SENTENCE'] || 'NO HIT SENTENCE',
        source: row.REDURL.includes('twitter.com') ? 'Twitter/X' : 'Facebook',
        influencer: row.REDNOMBRE,
        country: row.COUNTRY || 'Mexico',
        reach: row.REDALCANCE,
        engagement: row.ENGAGEMENT || 'NO ENGAGEMENT',
        sentiment: row.SENTIMENT || 'NOT RATED',
        keyPhrases: row['KEY PHRASES'],
        inputName: row['INPUT NAME'] || 'NO INPUT NAME',
        twitterScreenName: row['TWITTER SCREEN NAME'] || 'NO TWITTER SCREEN NAME',
        twitterFollowers: row.REDSEGUIDORES,
        twitterFollowing: row['TWITTER FOLLOWING'] || 'NO TWITTER FOLLOWING',
        state: row.STATE || 'NO STATE',
        city: row.CITY || 'NO CITY',
        views: row.VIEWS || 'NO VIEWS',
        likes: row.REDLIKES,
        replies: row.REPLIES || 'NO REPLIES',
        retweets: row.REDRETWEETS,
        comments: row.COMMENTS || 'NO COMMENTS',
        shares: row.SHARES || 'NO SHARES',
        reactions: row.REACTIONS || 'NO REACTIONS',
        threads: row.THREADS || 'NO THREADS',
    }))
}
