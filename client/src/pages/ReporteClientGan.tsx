import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../components/Table';
import { BottonExporClientGanador } from '../components/ExportClientGanador';
import { CalendarLocaleExample } from '../components/ui/SelectDate';
import { URL_API_DATA } from '../utils/contanst';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { DataCliente } from '../types/Interfaces';

export default function ReportClienteGanadores() {
  const [date1, setDate1] = useState<Date | undefined>(undefined)
  const [date2, setDate2] = useState<Date | undefined>(undefined)
  const [zona, setZona] = useState<string | undefined>(undefined)

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [data, setData] = useState<DataCliente[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (date1 === undefined || date2 === undefined || zona === undefined) {
      alert('Debe seleccionar las fechas y la empresa');
      return;
    }

    axios.post(`${URL_API_DATA}/reporClientGanadores`, { fecha1: date1.toISOString().slice(0, 10), fecha2: date2.toISOString().slice(0, 10), zona })
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <section>
      <div className='w-full flex gap-4 px-2 pt-1 items-center border-b pb-2'>
        <button onClick={() => setVisible(!visible)}
          className={`${visible ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded-md w-40`} >
          {visible ? 'Ocultar' : 'Fecha Inicial'}
        </button>


        <article className='w-56'>
          <span className='font-semibold'>Fecha Inicial:</span> {date1?.toISOString().slice(0, 10) || ' '}
        </article>

        <button onClick={() => setVisible2(!visible2)}
          className={`${visible2 ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded-md w-40`} >
          {visible2 ? 'Ocultar' : 'Fecha Final'}
        </button>

        <article className='w-56'>
          <span className='font-semibold'>Fecha Final:</span> {date2?.toISOString().slice(0, 10) || ' '}
        </article>

        <form onSubmit={handleSubmit} className='gap-2 flex'>
          <select name='zona' className='px-4 rounded-md w-52' value={zona} onChange={e => setZona(e.target.value)}>
            <option value=' '>Selecione Empresa</option>
            <option value='39627'>Multired</option>
            <option value='39628'>Servired</option>
          </select>

          <button type='submit' className='bg-green-500 hover:bg-green-600 text-white p-2 rounded-md w-40'>
            Solicitar Reporte
          </button>
        </form>

        <div className='flex gap-2 items-center'>
          <p className='font-semibold'>Cantidad De Datos:</p>
          <span className='px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800'>
            {data.length}
          </span>

        </div>

        <div>
          {
            data.length > 0 ? <BottonExporClientGanador datos={data} /> : null
          }
        </div>
      </div>

      <div className='absolute z-20 top-12 left-2'>
        {visible && (<CalendarLocaleExample key={'fechaInitial'} value={date1} onChange={setDate1} />)}
      </div>

      <div className='absolute z-20 top-12 left-96'>
        {visible2 && (<CalendarLocaleExample key={'fechaFinal'} value={date2} onChange={setDate2} />)}
      </div>

      <div className='h-[92vh] overflow-y-auto'>
        {
          data.length > 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Documento</TableHeaderCell>
                  <TableHeaderCell>Nombre</TableHeaderCell>
                  <TableHeaderCell>Dirección</TableHeaderCell>
                  <TableHeaderCell>Teléfono</TableHeaderCell>
                  <TableHeaderCell>Premios</TableHeaderCell>
                  <TableHeaderCell>Cantidad</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.Client.DOCUMENTO}</TableCell>
                      <TableCell>{item.Client.NOMBRES}</TableCell>
                      <TableCell>{item.Client.DIRECCION}</TableCell>
                      <TableCell>{item.Client.TELEFONO1}</TableCell>
                      <TableCell>{item.TOTALPREMIOS}</TableCell>
                      <TableCell>{item.CANT}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          )
        }
      </div>
    </section>
  )
}