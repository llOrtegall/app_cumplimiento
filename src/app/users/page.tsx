import { getAllUsers } from '../../api'

export default async function UsersPage() {
  const users = await getAllUsers()

  console.log(users);

  return (
    <section className='m-2'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombres
              </th>
              <th scope="col" className="px-6 py-3">
                Appelidos
              </th>
              <th scope="col" className="px-6 py-3">
                Identificación
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => (
                <tr key={user.identificacion} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.nombres}
                  </th>
                  <td className="px-6 py-4">
                    {user.apellidos}
                  </td>
                  <td className="px-6 py-4">
                    {user.identificacion}
                  </td>
                  <td className="px-6 py-4">
                    {user.estado}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}