import { Request, Response } from 'express'
import fs from 'fs'

export const removeSocialDataFile = async (req: Request, res: Response) => {
    try {
        const { filePath } = req.body

        if (!filePath) {
            return res.status(400).json({ message: 'Se requiere la ruta del archivo' })
        }

        try {
            await fs.promises.access(filePath, fs.constants.F_OK)
        } catch (error) {
            return res.status(404).json({ message: 'Archivo no encontrado' })
        }

        try {
            await fs.promises.unlink(filePath)
            return res.status(200).json({ message: 'Archivo eliminado correctamente' })
        } catch (error) {
            console.error('Error removing file:', error)
            return res.status(500).json({ message: 'Error al eliminar el archivo' })
        }
    } catch (error) {
        console.error('Error', error)
        return res.status(500).json({ message: 'Ocurrió un error al intentar eliminar el archivo descargado' })
    }
}
