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
    engagement: string | number
    sentiment: string
    keyPhrases: string
    inputName: string
    twitterScreenName: string
    twitterFollowers: number
    twitterFollowing: string | number
    state: string
    city: string
    views: string | number
    likes: number
    replies: string | number
    retweets: number
    comments: string | number
    shares: string | number
    reactions: string | number
    threads: string | number
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

export interface SearchHistoryRequestBody {
    title: string
    booleanQuery: string
    isBooleanSearch: boolean
}
