import { FillPattern, Workbook, Worksheet } from 'exceljs'
import { QueryResult } from '../interfaces/export'
import * as fs from 'fs'

export const generateExcelFile = async (queryResult: QueryResult[]): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const workbook = createWorkbook()
            const worksheet = workbook.addWorksheet('Resultados')
            addColumnNames(worksheet)
            setColumnWidths(worksheet)
            applyHeaderStyle(worksheet)
            setDefaultRowHeight(worksheet)

            if (queryResult) {
                addDataRows(worksheet, queryResult)
            }

            const timestamp = generateTimestamp()
            const directory = 'docs'
            const fileName = `${directory}/smd-${timestamp}.xlsx`

            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory)
            }

            await writeFile(workbook, fileName)

            resolve(fileName)
        } catch (error) {
            reject(error)
        }
    })
}

const generateTimestamp = (): string => {
    const date = new Date().toISOString()
    return date.replace(/[-:T.]/g, '').slice(0, 14)
}

const createWorkbook = (): Workbook => {
    return new Workbook()
}

const addColumnNames = (worksheet: Worksheet) => {
    const columnNames = [
        'Date',
        'Headline',
        'URL',
        'Opening Text',
        'Hit Sentence',
        'Source',
        'Influencer',
        'Country',
        'Reach',
        'Engagement',
        'Sentiment',
        'Key Phrases',
        'Input Name',
        'Twitter Screen Name',
        'Twitter Followers',
        'Twitter Following',
        'State',
        'City',
        'Views',
        'Likes',
        'Replies',
        'Retweets',
        'Comments',
        'Shares',
        'Reactions',
        'Threads',
    ]
    worksheet.addRow(columnNames)
}

const setColumnWidths = (worksheet: Worksheet) => {
    worksheet.columns = [
        { key: 'A', width: 15 },
        { key: 'B', width: 30 },
        { key: 'C', width: 30 },
        { key: 'D', width: 30 },
        { key: 'E', width: 30 },
        { key: 'F', width: 20 },
        { key: 'G', width: 20 },
        { key: 'H', width: 15 },
        { key: 'I', width: 10 },
        { key: 'J', width: 10 },
        { key: 'K', width: 15 },
        { key: 'L', width: 30 },
        { key: 'M', width: 20 },
        { key: 'N', width: 30 },
        { key: 'O', width: 20 },
        { key: 'P', width: 20 },
        { key: 'Q', width: 15 },
        { key: 'R', width: 15 },
        { key: 'S', width: 10 },
        { key: 'T', width: 10 },
        { key: 'U', width: 10 },
        { key: 'V', width: 10 },
        { key: 'W', width: 10 },
        { key: 'X', width: 10 },
        { key: 'Y', width: 10 },
        { key: 'Z', width: 10 },
    ]
    worksheet.columns.forEach((column) => {
        column.alignment = { wrapText: true }
    })
}

const applyHeaderStyle = (worksheet: any) => {
    const headerStyle = {
        font: { color: { argb: 'FFFFFF' }, bold: true },
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '338AFF' },
        } as FillPattern,
    }
    worksheet.getRow(1).eachCell((cell: { font: { color: { argb: string }; bold: boolean }; fill: FillPattern }) => {
        cell.font = headerStyle.font
        cell.fill = headerStyle.fill
    })
}

const setDefaultRowHeight = (worksheet: Worksheet) => {
    worksheet.properties.defaultRowHeight = 20
}

const addDataRows = (worksheet: Worksheet, queryResult: QueryResult[]) => {
    if (queryResult) {
        queryResult.forEach((row: QueryResult, index: number) => {
            const rowData = [
                row.date,
                row.headline,
                row.url,
                row.openingText,
                row.hitSentence,
                row.source,
                row.influencer,
                row.country,
                row.reach,
                row.engagement,
                row.sentiment,
                row.keyPhrases,
                row.inputName,
                row.twitterScreenName,
                row.twitterFollowers,
                row.twitterFollowing,
                row.state,
                row.city,
                row.views,
                row.likes,
                row.replies,
                row.retweets,
                row.comments,
                row.shares,
                row.reactions,
                row.threads,
            ]

            worksheet.addRow(rowData)
        })
    }
}

const writeFile = async (workbook: Workbook, fileName: string) => {
    await workbook.xlsx.writeFile(fileName)
}
