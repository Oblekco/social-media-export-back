export const convertBooleanQueryToSQLQuery = (booleanQuery: string): string => {
    const conditions = booleanQuery.split(/\s+(AND|OR|NOT)\s+/)

    let formattedConditions: string[] = []
    let currentOperator = ''

    conditions.forEach((condition) => {
        if (condition === 'AND' || condition === 'OR' || condition === 'NOT') {
            currentOperator = condition
        } else {
            let formattedCondition = ''
            if (condition.startsWith('to:')) {
                const keyword = condition.substring(3)
                formattedCondition = `REDCONTENIDO LIKE '%${keyword}%'`
            } else if (condition.startsWith('from:')) {
                const keyword = condition.substring(5)
                formattedCondition = `REDNOMBRE LIKE '%${keyword}%'`
            } else {
                formattedCondition = `(REDCONTENIDO LIKE '%${condition}%' OR REDNOMBRE LIKE '%${condition}%')`
            }

            if (currentOperator) {
                formattedConditions.push(`${currentOperator} ${formattedCondition}`)
                currentOperator = ''
            } else {
                formattedConditions.push(formattedCondition)
            }
        }
    })

    return formattedConditions.join(' ')
}
