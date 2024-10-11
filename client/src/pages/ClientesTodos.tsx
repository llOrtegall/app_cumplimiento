import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/Select';
import { RenderClients } from '../components/ui/RenderClients';
import { RenderFooterClients } from '../components/ui/RenderFooterClients';
import { useClientes } from '../hooks/useClientes';
import { CantidadDatos } from '../utils/contanst'

function ClientesTodos() {
  const { clients, page, setPage, setPageSize, totalClients, totalPages } = useClientes({ url: 'clientes' });

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
        <RenderClients clientes={clients} />
      </div>

      <RenderFooterClients page={page} totalPages={totalPages} setPage={setPage} />

    </section>
  )
}

export default ClientesTodos
