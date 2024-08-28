export interface QueryResult {
    temquetema: string
    temquequery: string
    queclave: string
    quenombre: string
    quequery: string
    quequeryoracle: string
    texnombre: string
    quequeryregexp: string
}

export interface Data {
    [key: string]: any
}
export interface Registro {
    [key: string]: any
    FECHA: string
    HORA: string
    FAMDESCRIPCION: string
    FESDESCRIPCION: string
    FNODESCRIPCION: string
    FNOTIRAJE: string
    FNODIASEMISION: string
    FCADESCRIPCION: string
    MUNNOMMUNICIPIO: string
    FREBANDA: string
    FREFRECUENCIA: string
    FREHORARIO: string
    FMECLAVE: string
    FMEDESCRIPCION: string
    FTMDESCRIPCION: string
    FCLDESCRIPCION: string
    CAPTITULO: string
    CAPDURACION: string
    CAPCLAVE: string
    CAPCM: string
    CAPFRACCION: string
    CAPCOSTOCM: string
    CAADIST8A12: string
    CAADIST13A17: string
    CAADIST18A24: string
    CAADIST25A34: string
    CAADIST35A44: string
    CAADIST45A54: string
    CAADIST55AMAS: string
    CAADISTALTO: string
    CAADISTMEDIO: string
    CAADISTBAJO: string
    CAADISTHOMBRE: string
    CAADISTMUJER: string
    CAABANDA: string
    CAAALCANCEREAL: string
    PAGINA: string
    AUTOR: string
    CAPNOMBRE: string
    FPRDESCRIPCION: string
    FRESIGLAS: string
    CIMNOMBREARCHIVO: string
    CAPTIPOCOSTO: string
    FTECONDUCTOR: string
    CAPTEXTCOMP: string
    QUERY: string
    QUERYHIJO: string
}

export interface Valoracion {
    FECHA: string
    HORA: string
    FAMDESCRIPCION: string
    FESDESCRIPCION: string
    FNODESCRIPCION: string
    FNOTIRAJE: string
    FTECONDUCTOR: string
    FNOMEDIO: string
    FNODIASEMISION: string
    FCADESCRIPCION: string
    MUNNOMMUNICIPIO: string
    FREBANDA: string
    FREFRECUENCIA: string
    FREHORARIO: string
    FMECLAVE: string
    FMEDISTRIBUCION: string
    FTMDESCRIPCION: string
    FCLDESCRIPCION: string
    VACACTOR: string
    CAPTITULO: string
    CAPDURACION: string
    CAPCLAVE: string
    CAPCM: string
    CAPFRACCION: string
    CAPCOSTOCM: string
    TEXNOMBRE: string
    QUENOMBRE: string
    TEVDESCRIPCION: string
    VACPARTICIPACION: string
    VACCATEGORIA: string
    VACTENDENCIA: string
    VACFODA: string
    VACSUBTEMAXML: string
    VACFVALORACION: string
    USRNOMBRE: string
    CAADIST8A12: number
    CAADIST13A17: number
    CAADIST18A24: number
    CAADIST25A34: number
    CAADIST35A44: number
    CAADIST45A54: number
    CAADIST55AMAS: number
    CAADISTALTO: number
    CAADISTMEDIO: number
    CAADISTBAJO: number
    CAADISTHOMBRE: number
    CAADISTMUJER: number
    CAABANDA: string
    CAAFRECUENCIA: string
    CAAALCANCEREAL: number
    TOPDESCRIPCION: string
    PAGINA: string
    AUTOR: string
    CAPNOMBRE: string
    CAPMEDIO: string
    FPRDESCRIPCION: string
    FRESIGLAS: string
    CAPTIPOCOSTO: number
    CAPTEXTCOMP: string
}
