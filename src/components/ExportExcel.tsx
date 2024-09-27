import { MarcacionSimple } from '../types/marcacion'
import { utils, ColInfo, writeFile } from 'xlsx'
import { toast } from 'sonner'

interface Props {
  datos: MarcacionSimple[]
  time1?: string
  time2?: string
}

const generateExcelData = (datos: MarcacionSimple[], time1?: string, time2?: string): unknown[] => {
  const titulo = [{ A: `Resporte Marcaciones Fecha Inicial: ${time1} - Fecha Final: ${time2}` }]
  const headers = [
    {
      A: 'ID',
      B: 'Nombres',
      C: 'Apellidos',
      D: 'Fecha Marcación',
      E: 'Hora Marcación',
      F: 'Estado Marcación',
    }
  ]

  const rows = datos.map((it) => ({
    A: it.id,
    B: it.nombres,
    C: it.apellidos,
    D: it.fecha,
    E: it.hora,
    F: it.estado
  }))

  return [...titulo, ...headers, ...rows]
}

const createExcelFile = (data: unknown[]): void => {
  const libro = utils.book_new()
  const hoja = utils.json_to_sheet(data, { skipHeader: true })

  hoja['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }]

  const colWidths: ColInfo[] = [
    { width: 10 }, { width: 10 }, { width: 30 }, { width: 10 }, { width: 20 },
    { width: 10 }, { width: 10 }, { width: 20 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }
  ]

  hoja['!cols'] = colWidths
  utils.book_append_sheet(libro, hoja, 'Cartera')
  writeFile(libro, 'ReporteCartera.xlsx')
}

export const BottonExporCartera = ({ datos, time1, time2 }: Props): JSX.Element => {
  const handleDownload = (): void => {
    const dataFinal = generateExcelData(datos, time1, time2)

    const promises = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: 'sonner' })
      }, 3000)
    })

    toast.promise(promises, {
      loading: 'Generando Archivo ...',
      description: 'Espere un momento',
      style: { background: '#fcd34d' },
      success: () => {
        createExcelFile(dataFinal)
        return 'Archivo Generado Correctamente'
      },
      error: 'Error al Generar Archivo'
    })
  }

  return (
    <button className='px-4 py-2 bg-green-600 rounded-lg font-semibold text-white hover:bg-green-500' onClick={handleDownload}>
      Exportar Excel
    </button>
  )
}