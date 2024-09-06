export interface QueryResult {
    date: string
    headline: string
    url: string
    openingText: string
    hitSentence: string
    source: string
    influencer: string
    country: string
    reach: number
    engagement: number
    sentiment: string
    keyPhrases: string
    inputName: string
    twitterScreenName: string
    twitterFollowers: number
    twitterFollowing: number
    state: string
    city: string
    views: number
    likes: number
    replies: number
    retweets: number
    comments: number
    shares: number
    reactions: number
    threads: number
}

export interface SearchRequestBody {
    dateEnd: string
    dateStart: string
    booleanQuery: string
    allKeywords: string[]
    allSearches: string[]
    anyKeywords: string[]
    anySearches: string[]
    notKeywords: string[]
    notSearches: string[]
    searchQueryType: string
}
