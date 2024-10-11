import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../components/Table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/Select';
import { CantidadDatos, Categorizacion } from '../utils/contanst'
import { useClientes } from '../hooks/useClientes';
import { useNavigate } from 'react-router-dom';


function ClientesTodos() {
  const { clients, page, setPage, setPageSize, totalClients, totalPages } = useClientes({ url: 'clientes' });
  const navigate = useNavigate();

  return (
    <section className=''>

      <section className='flex py-2 justify-around'>

        <div className='flex items-center gap-2'>
          <label className='text-sm font-semibold'>Clientes Nuevos:</label>
          <span className='px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800'>{totalClients}</span>
        </div>

        <div className='flex items-center gap-2'>
          <label className='text-sm font-semibold'>Buscar:</label>
          <input type='text' className='w-[200px] px-1 py-2 text-sm border border-gray-200 rounded-md dark:border-gray-800' />
          <button className='px-2 py-2 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800 hover:bg-green-200 transition-colors'>Buscar</button>
        </div>

        <div className='flex items-center gap-2'>
          <label className='text-sm font-semibold'>Mostrar:</label>
          <Select defaultValue={'100'} onValueChange={value => setPageSize(parseInt(value))}>
            <SelectTrigger className='mx-auto w-[120px]'>
              <SelectValue placeholder='Select' />
            </SelectTrigger>
            <SelectContent>
              {CantidadDatos.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <span className='flex justify-between gap-x-2'>
                    <item.icon className='size-4 shrink-0 text-gray-500 dark:text-gray-500' aria-hidden='true' />
                    {item.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <div className='h-[90vh] overflow-y-auto'>
        <Table>
          <TableHead className='bg-blue-100'>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Documento</TableHeaderCell>
              <TableHeaderCell>Telefono</TableHeaderCell>
              <TableHeaderCell>Correo</TableHeaderCell>
              <TableHeaderCell>Categoría</TableHeaderCell>
              <TableHeaderCell>Tipo Zona</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((item) => (
              <TableRow key={item.DOCUMENTO}>
                <TableCell>{item.NOMBRES}</TableCell>
                <TableCell>{item.DOCUMENTO}</TableCell>
                <TableCell>{item.TELEFONO1}</TableCell>
                <TableCell>{item.EMAIL}</TableCell>
                <TableCell>
                  {
                    Categorizacion.find((cat) => cat.value === item.CATEGORIA)?.label
                  }
                </TableCell>
                <TableCell>{item.TIPOZONA}</TableCell>
                <TableCell>
                  <button onClick={() => navigate(`/editar-cliente/${item.DOCUMENTO}`)} className='px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800 hover:bg-green-200 transition-colors'>Editar</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>

      <div className='flex items-center justify-center py-1 bg-yellow-50 gap-2'>
        <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}
          className={` ${page === 1 ? 'hover:bg-red-200' : 'hover:bg-green-200'} px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800  transition-colors`}>
          Previous
        </button>

        <span>{page} de {totalPages}</span>

        <button disabled={page === totalPages} onClick={() => setPage((prev) => prev + 1)}
          className={` ${page === totalPages ? 'hover:bg-red-200' : 'hover:bg-green-200'} px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800  transition-colors`} >
          Next
        </button>

      </div>

    </section>
  )
}

export default ClientesTodos
