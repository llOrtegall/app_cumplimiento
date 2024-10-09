import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeaderCell, TableRoot, TableRow } from "./components/Table";
import { Cliente, DataResponse } from "./types/Interfaces";
import { useEffect, useState } from "react";

function App() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [totalClients, setTotalClients] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(100);

  // const [identificacion, setIdentificacion] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`http://172.20.1.70:3030/clientes?page=${page}&pageSize=${pageSize}`);
        const data = await response.json() as DataResponse;
        setClients(data.clients);
        setTotalClients(data.count);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, [page, pageSize]);

  const totalPages = Math.ceil(totalClients / pageSize);

  return (
    <section className=''>
      <div className='py-2 px-2 text-end'>
        <p>Total Clientes Nuevos: {totalClients}</p>
      </div>
      <div className="h-[90vh] overflow-y-auto">
        <TableRoot>
          <Table>
            <TableCaption>Recent invoices.</TableCaption>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Documento</TableHeaderCell>
                <TableHeaderCell>Telefono</TableHeaderCell>
                <TableHeaderCell>Correo</TableHeaderCell>
                <TableHeaderCell>Categoría</TableHeaderCell>
                <TableHeaderCell>Tipo Zona</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((item) => (
                <TableRow key={item.DOCUMENTO}>
                  <TableCell>{item.NOMBRES}</TableCell>
                  <TableCell>{item.DOCUMENTO}</TableCell>
                  <TableCell>{item.TELEFONO1}</TableCell>
                  <TableCell>{item.EMAIL}</TableCell>
                  <TableCell>{item.CATEGORIA}</TableCell>
                  <TableCell>{item.TIPOZONA}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>

      </div>

      <div className='flex items-center justify-center py-2 bg-yellow-50 gap-2'>
        <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}
          className="px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800">
          Previous
        </button>

        <span>{page} de {totalPages}</span>

        <button disabled={page === totalPages} onClick={() => setPage((prev) => prev + 1)}
          className="px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800" >
          Next
        </button>

      </div>

    </section>
  )
}

export default App
