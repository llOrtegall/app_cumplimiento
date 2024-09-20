import { UserIcon, LockIcon } from '../components/icons'
import { Input, Button, Label } from '../components/ui'
import { useAuth } from '../auth/AuthContext'
import { useState, FormEvent } from 'react'
import { toast, Toaster } from 'sonner'
import axios from 'axios'

import { URL_API, APP_NAME } from '../utils/contants'

function LoginPage() {
  const { setIsAuthenticated } = useAuth()
  const [username, setUsername] = useState('')
  const [errorString, setErrorString] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()

    axios.post(`${URL_API}/login`, { username, password, app: APP_NAME })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true)
        }
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error') {
          setErrorString('Error de conexión, y/o Red, contacte al administrador del sistema')
          return
        }
        setErrorString(error.response.data)
      })
      .finally(() => {
        setTimeout(() => {
          setErrorString('')
        }, 4000)
      })
  }

  return (
    <section className='flex items-center justify-center h-screen'>

      <form className='flex flex-col gap-6 bg-gray-200 px-16 py-8 rounded-md' onSubmit={handleSubmit}>
        <figure className='flex justify-center'>
          <img src='/gane.webp' alt='Logo' width={180} />
        </figure>

        <div>
          <Label>Usuario</Label>
          <div className='flex gap-2'>
            <UserIcon />
            <Input type='text' autoComplete='username' required value={username}
              onChange={ev => setUsername((ev.target as HTMLInputElement).value)} />
          </div>
        </div>
        <div>
          <Label>Contraseña</Label>
          <div className='flex gap-2'>
            <LockIcon />
            <Input type='password' autoComplete='password' required value={password}
              onChange={ev => setPassword((ev.target as HTMLInputElement).value)} />
          </div>
        </div>

        <Button type='submit'>Iniciar sesión</Button>

      </form>

      {errorString && toast.error(errorString, { description: 'Error al Iniciar Sesion', id: ' ', duration: 5000 })}
      <Toaster position='top-right' duration={3000} />

    </section>
  )
}

export default LoginPage