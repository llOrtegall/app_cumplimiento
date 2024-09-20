import { useAuth } from '../auth/AuthContext'
import { FormEvent, useState } from 'react'
import { toast, Toaster } from 'sonner'
import axios from 'axios'

import { URL_API, APP_NAME } from '../utils/contants'

function LoginPage() {
  const { setIsAuthenticated } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    axios.post(`${URL_API}/login`, { username, password, app: APP_NAME })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true)
        }
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error') {
          toast.error('Error de conexión, y/o Red, contacte al administrador del sistema', { description: 'No se pudo iniciar session' })
          return
        }

        if (error.response.status === 400 || error.response.status === 401) {
          toast.error(error.response.data.message, { description: error.response.data.description })
          return
        }

      })
  }

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <figure className='flex justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
              <img width={180} src='/gane.webp' alt='logo' />
            </figure>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Iniciar sesión en tu cuenta
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Usuario:</label>
                <input type='text' className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='CP1118******' required value={username} onChange={ev => setUsername(ev.target.value)} />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Contraseña</label>
                <input type='password' placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required value={password} onChange={ev => setPassword(ev.target.value)} />
              </div>


              <button className='w-full px-4 py-2 text-sm font-medium tracking-wider text-white uppercase bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 hover:bg-blue-700 active:bg-blue-700'>Iniciar sesión</button>
            </form>
          </div>
        </div>
      </div>

      <Toaster duration={4000} position='top-right' richColors visibleToasts={3} />
    </section>
  )
}

export default LoginPage