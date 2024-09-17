import { useEffect, useState, ChangeEvent } from 'react';
import { OnePersona } from '../../types/Persona';
import { URL_API } from '../../utils/contants';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function InfoPersona() {
  const { id } = useParams();
  const [persona, setPersona] = useState<OnePersona>({ id: 0, identificacion: '', apellidos: '', nombres: '', email: '', telefono: '' });

  useEffect(() => {
    axios.get(`${URL_API}/persona/${id}`)
      .then(response => setPersona(response.data))
      .catch(error => console.log(error));
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersona(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className='p-12 h-[90vh]'>

      <form className='flex'>
        <section className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="nombres" value={persona.nombres} id="nombres" onChange={ev => handleInputChange(ev)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="nombres" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombres</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="apellidos" value={persona.apellidos} id="apellidos" onChange={ev => handleInputChange(ev)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="apellidos" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellidos</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="email" value={persona.email} id="email" onChange={ev => handleInputChange(ev)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="identificacion" value={persona.identificacion} id="identificacion" onChange={ev => handleInputChange(ev)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="identificacion" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Identificación</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="telefono" value={persona.telefono} id="telefono" onChange={ev => handleInputChange(ev)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="telefono" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefono</label>
            </div>
          </div>
        </section>
        <section className="w-96 mx-auto">
          <div className="w-full mb-5 group">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>United States</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </select>
          </div>
          <div className="w-full mb-5 group">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>United States</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </select>
          </div>
          <div className="w-full mb-5 group">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>United States</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </select>
          </div>
        </section>
      </form>

    </section>
  );
}