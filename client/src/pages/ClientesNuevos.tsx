import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../components/Table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/Select';
import { Cliente, DataResponse } from '../types/Interfaces';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import { CantidadDatos } from '../utils/contanst'

function ClientesNuevos() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [totalClients, setTotalClients] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);

  const [identificaciones, setIdentificaciones] = useState<string[]>([]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    if (checked) {
      setIdentificaciones([...identificaciones, value]);
    } else {
      setIdentificaciones(identificaciones.filter((id) => id !== value));
    }
  }

  const checkboxesRef = useRef<HTMLInputElement[]>([]);

  const limpiarSeleccion = () => {
    checkboxesRef.current.forEach((checkbox) => {
      if (checkbox) {
        checkbox.checked = false;
      }
    });
    setIdentificaciones([]);
  };


  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`http://172.20.1.70:3030/clientesNevos?page=${page}&pageSize=${pageSize}`);
        const data = await response.json() as DataResponse;
        setClients(data.clients);
        setTotalClients(data.count);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, [page, pageSize]);

  const totalPages = Math.ceil(totalClients / pageSize);
  const navigate = useNavigate();

  console.log(identificaciones);

  return (
    <section className=''>

      <section className='flex py-2 justify-around'>

        <div className='flex items-center gap-2'>
          <label className='text-sm font-semibold'>Clientes Nuevos:</label>
          <span className='px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800'>{totalClients}</span>
        </div>

        {
          identificaciones.length > 0 && (
            <div className='flex gap-2'>
              <button className='px-2 py-2 text-sm text-gray-800 bg-blue-200 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800 hover:bg-green-200 transition-colors'>Edición Masiva</button>
              <button onClick={limpiarSeleccion} className='px-2 py-2 text-sm text-gray-800 bg-yellow-200 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800 hover:bg-red-200 transition-colors'>Limpiar Seleción</button>
            </div>
          )
        }

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
              <TableHeaderCell>Check</TableHeaderCell>
              <TableHeaderCell>Nombres</TableHeaderCell>
              <TableHeaderCell>Documento</TableHeaderCell>
              <TableHeaderCell>Telefono</TableHeaderCell>
              <TableHeaderCell>Correo</TableHeaderCell>
              <TableHeaderCell>Categoría</TableHeaderCell>
              <TableHeaderCell>Tipo Zona</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((item, index) => (
              <TableRow key={item.DOCUMENTO}>
                <TableCell>
                  <input type='checkbox' value={item.DOCUMENTO} onChange={handleCheck} ref={(el) => {
                    if (el) { checkboxesRef.current[index] = el }
                  }} />
                </TableCell>
                <TableCell>{item.NOMBRES}</TableCell>
                <TableCell>{item.DOCUMENTO}</TableCell>
                <TableCell>{item.TELEFONO1}</TableCell>
                <TableCell>{item.EMAIL}</TableCell>
                <TableCell>{item.CATEGORIA}</TableCell>
                <TableCell>{item.TIPOZONA}</TableCell>
                <TableCell>
                  <button disabled={identificaciones.length > 0 ? true : false} onClick={() => navigate(`/editar-cliente/${item.DOCUMENTO}`)} className={`${identificaciones.length > 0
                    ? 'min-w-20 px-2 py-1 text-sm font-medium text-gray-800 bg-red-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800 '
                    : 'min-w-20 px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800 hover:bg-green-200 transition-colors'} `}>
                    {
                      identificaciones.length > 0 ? '🚫' : 'Editar'
                    }
                  </button>
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

export default ClientesNuevos
