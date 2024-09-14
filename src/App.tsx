import axios from 'axios'
import { useEffect } from 'react'
import { URL_API } from './utils/contants'

function App() {

  useEffect(() => {
    axios.get(`${URL_API}/personas`)
  }, [])
  
  return (
    <div className='bg-red-400'>
      <h1>Hello World</h1>
    </div>
  )
}

export default App
