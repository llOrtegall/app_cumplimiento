import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/NavBar'

export default function Root () {
  return(
    <div className=''>
      <NavBar />
      <Outlet />
    </div>
  )
}