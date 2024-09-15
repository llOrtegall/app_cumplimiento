import { PlusIcon } from '../../../components/icons/PlusIcon';
import { type Area } from '../../../types/Interfaces';
import { FormEvent, useEffect, useState } from 'react';
import { URL_API } from '../../../utils/contants';
import { toast } from 'sonner';
import axios from 'axios';

export default function Areas() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [activeNewArea, setActiveNewArea] = useState<boolean>(false);

  const [codigo, setCodigo] = useState<string>('');
  const [nombreA, setNombreA] = useState<string>('');

  const [request, setRequest] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`${URL_API}/areas`)
      .then(response => {
        setAreas(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [request]);

  const handleNewArea = (e: FormEvent) => {
    e.preventDefault();
    
    axios.post(`${URL_API}/area`, { codigo, nombre: nombreA })
      .then(response => {
        console.log(response.data)
        if(response.status === 201) {
          toast.success('El área se creo correctamente', { description: 'Área creada' })
          setCodigo('')
          setNombreA('')
          setActiveNewArea(false)
          setRequest(true)
        }
      })
      .catch(error => {
        console.log(error)
        toast.error( error.response.data.message || 'Error ', { description: 'Error al crear el área' } )
      })
  }

  return (
    <section className="p-1 flex flex-col h-[91vh]">

      <table className="w-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              CODIGO
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre área
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {
            areas.map(emp => (
              <tr key={emp.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  ">
                <td className="px-6 py-4">
                  {emp.codigo}
                </td>
                <td className="px-6 py-4">
                  {emp.descripcion}
                </td>
                <td className='px-6 py-4 flex gap-2'>
                  <button className='bg-yellow-300 hover:bg-yellow-400 text-black px-2 py-1 rounded-md'>Editar</button>
                  <button className='bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded-md'>Eliminar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <section className='mt-auto border rounded-md bg-gray-200 py-2'>
        <form className='flex justify-end items-center relative' onSubmit={(e) => handleNewArea(e)}>
          <div className="flex items-center mb-4 absolute left-4 top-2">
            <input checked={activeNewArea} type="checkbox" value='' onChange={() => setActiveNewArea(!activeNewArea)} className="h-5 w-5 text-blue-600 border rounded-md mr-2" />
            <label htmlFor="">Nueva área</label>
          </div>
          <div className='flex items-center'>
            <label className={`${!activeNewArea ? 'hidden' : 'block'} text-gray-700 dark:text-gray-400 w-72 text-center `}>
              Código:
            </label>
            <input type="text" disabled={!activeNewArea} value={codigo} onChange={(e) => setCodigo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
          </div>
          <div className='flex items-center'>
            <label className={`${!activeNewArea ? 'hidden' : 'block'} text-gray-700 dark:text-gray-400 w-72 text-center `}>
              Nombre del área:
            </label>
            <input type="text" disabled={!activeNewArea} value={nombreA} onChange={(e) => setNombreA(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
          </div>
          <button type='submit'
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 mx-4 px-4 rounded h-10 ${!activeNewArea ? 'hidden' : 'block'}`}>
            <PlusIcon />
          </button>
        </form>
      </section>

    </section>
  );
}