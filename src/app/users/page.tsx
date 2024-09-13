import { getAllUsers } from '../../api'

getAllUsers()
  .then((users) => {
    console.log(users)
  })
  .catch((error) => {
    console.log(error) 
  })


export default function UsersPage() {

  return (
    <div>
      <h1>Users</h1>
    </div>
  )
}