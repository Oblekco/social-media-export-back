import { promises as fs } from 'fs'
import path from 'path'

const docsPath = path.join(__dirname, '../../docs')

export const fileRemover = async (): Promise<void> => {
    try {
        const files = await fs.readdir(docsPath)

        const now = new Date().getTime()

        for (const file of files) {
            if (file.endsWith('.xlsx') && file.startsWith('smd-')) {
                const timestampStr = file.split('-')[1].split('.')[0]
                const fileDate = new Date(
                    parseInt(timestampStr.slice(0, 4)),
                    parseInt(timestampStr.slice(4, 6)) - 1,
                    parseInt(timestampStr.slice(6, 8)),
                    parseInt(timestampStr.slice(8, 10)),
                    parseInt(timestampStr.slice(10, 12)),
                    parseInt(timestampStr.slice(12, 14))
                )

                const fileDateTime = fileDate.getTime()
                const diffInHours = (now - fileDateTime) / (1000 * 60 * 60)

                if (diffInHours >= 1) {
                    const filePath = path.join(docsPath, file)
                    await fs.unlink(filePath)
                }
            }
        }
    } catch (error) {
        console.error('Error removing files:', error)
    }
}
