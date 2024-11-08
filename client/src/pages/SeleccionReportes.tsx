import { RiGroupLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

export default function SeleccionReportes() {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-4 gap-4 p-4">

      <article className='flex flex-col justify-around bg-gradient-to-r from-cyan-900 to-blue-800 p-4 rounded-md shadow-xl space-y-2'>
        <h1 className='font-semibold text-2xl text-white'>Reporte Baloto</h1>
        <p className='text-white'>
          Genera la información de los premios pagados con el producto Baloto Miloto y Colorloto.
        </p>
        <div className='flex items-center justify-between'>
          <img src="/logoBaloto.webp" alt="logo de baloto" width={120} />
          <button onClick={() => navigate('/reportBaloto')}
            className='bg-yellow-300 hover:bg-yellow-400 p-2 rounded-md font-semibold'>Ingresar</button>
        </div>
      </article>

      <article className='flex flex-col justify-around bg-gradient-to-r from-green-900 to-green-800 p-4 rounded-md shadow-xl space-y-2'>
        <h1 className='font-semibold text-2xl text-white'>Clientes Más Ganadores</h1>
        <p className='text-white'>
          Permite mediante el número de cédula, conocer los clientes que más han ganado en premios.
        </p>
        <div className='flex items-center justify-between'>
          <RiGroupLine size={48} color='white' />
          <button 
            className='bg-yellow-300 hover:bg-yellow-400 p-2 rounded-md font-semibold'>Ingresar</button>
        </div>
      </article>

    </section>
  );
}