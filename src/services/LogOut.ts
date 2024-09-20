import { LOGIN_URL } from '../utils/contants'
import axios from 'axios'

export const LogoutAndDeleteToken = () => {
  const token = document.cookie

  axios.post(`${LOGIN_URL}/logout`, { token })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
}