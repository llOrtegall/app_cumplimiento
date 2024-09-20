import { UserIcon, LockIcon } from '../components/icons'
import { Input, Button, Label } from '../components/ui'
import { useAuth } from '../auth/AuthContext'
import { useState, FormEvent } from 'react'
import { toast, Toaster } from 'sonner'
import axios from 'axios'

import { LOGIN_URL, APP_NAME } from '../utils/contants'

function LoginPage() {
  const { setIsAuthenticated } = useAuth()
  const [username, setUsername] = useState('')
  const [errorString, setErrorString] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()

    axios.post(`${LOGIN_URL}/login`, { username, password, app: APP_NAME })
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
    <section className="bg-gray-50 dark:bg-gray-900">

      <div className="flex items-center justify-center min-h-screen py-6 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">
              Iniciar sesión
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="username">Usuario</Label>
                <UserIcon />
                <Input id="username" name="username" type="text" autoComplete="username" required value={username}
                  onChange={ev => setUsername((ev.target as HTMLInputElement) .value )} />
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <LockIcon />
                <Input id="password" name="password" type="password" autoComplete="current-password" required value={password}
                  onChange={ev => setPassword((ev.target as HTMLInputElement) .value )} />
              </div>
            </div>

            <div>
              <Button type="submit">Iniciar sesión</Button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-red-500">{errorString}</p>
          </div>
        </div>
      </div>

      {errorString && toast.error(errorString, { description: 'Error al Iniciar Sesion', id: ' ', duration: 5000 })}

      <Toaster position='top-right' duration={3000} />

    </section>
  )
}

export default LoginPage