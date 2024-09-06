import { RowDataPacket } from 'mysql2'
import { QueryResult } from '../interfaces/export'

export const formatSocialMediaData = (rows: RowDataPacket[]): QueryResult[] => {
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
