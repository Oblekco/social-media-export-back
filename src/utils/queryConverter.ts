export const convertBooleanQueryToSQLQuery = (query: string): string => {
    let sqlQuery = query
    sqlQuery = sqlQuery.replace(/\bAND\b/g, 'AND')
    sqlQuery = sqlQuery.replace(/\bOR\b/g, 'OR')
    sqlQuery = sqlQuery.replace(/\bNOT\b/g, 'NOT')

    sqlQuery = sqlQuery.replace(/(\w+)/g, (match) => `'${escapeString(match)}'`)

    return sqlQuery.replace(/'(\w+)'/g, (match, p1) => `LIKE '%${escapeString(p1)}%'`)
}

const escapeString = (str: string) => {
    return str.replace(/'/g, "''")
}
