import { type Turnos } from "../../../types/Interfaces";
import { URL_API } from "../../../utils/contants";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Turnos() {
  const [turnos, setturnos] = useState<Turnos[]>([]);

  useEffect(() => {
    axios.get(`${URL_API}/turnos`)
      .then(response => {
        setturnos(response.data)
        // setRequest(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, []);
  return (
    <section className="p-1 flex flex-col h-[91vh] relative">
      <table className="w-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">CODIGO</th>
            <th scope="col" className="px-6 py-3">Nombre turno</th>
            <th scope="col" className="px-6 py-3">Hora Inicio</th>
            <th scope="col" className="px-6 py-3">Hora Fin</th>
            <th scope="col" className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            turnos.map(turno => (
              <tr key={turno.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  ">
                <td className="px-6 py-4">
                  {turno.codigo}
                </td>
                <td className="px-6 py-4">
                  {turno.descripcion}
                </td>
                <td className="px-6 py-4">
                  {turno.hora_inicio}
                </td>
                <td className="px-6 py-4">
                  {turno.hora_fin}
                </td>
                <td className='px-6 py-4 flex gap-2'>
                  <button className='bg-yellow-300 hover:bg-yellow-400 text-black px-2 py-1 rounded-md' // onClick={() => updateturno(turno)}
                    >Editar</button>
                  <button className='bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded-md' // onClick={() => openModal(turno.ID)}
                    >Eliminar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </section>
  );
}