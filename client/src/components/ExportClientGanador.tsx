import { DataCliente } from '../types/Interfaces'
import { utils, ColInfo, writeFile } from 'xlsx'
import { toast } from 'sonner'

const generateExcelData = (datos: DataCliente[]): unknown[] => {
  const titulo = [{ A: 'Reporte Premios Pagados Baloto ' }]
  const headers = [
    {
      A: 'SERIE CONSECUTIVO',
      B: 'TIPO PREMIO',
      C: 'VALOR PREMIO',
      D: 'RETEFUENTE',
      E: 'CAJERO',
      F: 'FECHA PAGO',
      G: 'TERCER',
      H: 'EMPRESA',
    }
  ]

  const rows = datos.map((it) => ({
    A: it.Client.DOCUMENTO,
    B: it.Client.NOMBRES,
    C: it.Client.DIRECCION,
    D: it.Client.TELEFONO1,
    E: it.TOTALPREMIOS,
    F: it.CANT
  }))

  return [...titulo, ...headers, ...rows]
}

const createExcelFile = (data: unknown[]): void => {
  const libro = utils.book_new()
  const hoja = utils.json_to_sheet(data, { skipHeader: true })

  hoja['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }]

  const colWidths: ColInfo[] = [
    { width: 30 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }
  ]

  hoja['!cols'] = colWidths
  utils.book_append_sheet(libro, hoja, 'Baloto')
  writeFile(libro, 'ReporteBaloto.xlsx')
}

export const BottonExporClientGanador = ({ datos }: { datos: DataCliente[] }): JSX.Element => {
  const handleDownload = (): void => {
    const dataFinal = generateExcelData(datos)

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
    <button onClick={handleDownload} className='bg-yellow-300 hover:bg-yellow-400  p-2 rounded-md text-black'>
      Exportar a Excel
    </button>
  )
}