export const convertBooleanQueryToSQLQuery = (booleanQuery: string): string => {
    const conditions = booleanQuery.split(/\s+(AND|OR|NOT)\s+/)

    let formattedConditions: string[] = []
    let currentOperator = ''

    conditions.forEach((condition, index) => {
        if (condition === 'AND' || condition === 'OR' || condition === 'NOT') {
            currentOperator = condition
        } else if (condition.trim() !== '') {
            const escapeSQL = (str: string): string => str.replace(/'/g, "''")

            let formattedCondition = ''
            if (condition.startsWith('to:')) {
                const keyword = escapeSQL(condition.substring(3))
                formattedCondition = `REDCONTENIDO LIKE '%${keyword}%'`
            } else if (condition.startsWith('from:')) {
                const keyword = escapeSQL(condition.substring(5))
                formattedCondition = `REDNOMBRE LIKE '%${keyword}%'`
            } else {
                const keyword = escapeSQL(condition)
                formattedCondition = `(REDCONTENIDO LIKE '%${keyword}%' OR REDNOMBRE LIKE '%${keyword}%')`
            }

            // Agregar el operador anterior si existe
            if (currentOperator) {
                if (currentOperator === 'NOT') {
                    formattedConditions.push(`${currentOperator} (${formattedCondition})`)
                } else {
                    formattedConditions.push(`${currentOperator} ${formattedCondition}`)
                }
                currentOperator = ''
            } else {
                formattedConditions.push(formattedCondition)
            }
        } else if (index === 0 || index === conditions.length - 1) {

        } else {
            throw new Error('Formato inválido: operadores consecutivos o condición vacía.')
        }
    })

    // Unir todas las condiciones
    return formattedConditions.join(' ')
}
