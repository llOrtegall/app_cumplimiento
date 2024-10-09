import { Cliente, DataResponse } from "./types/Interfaces";
import { useEffect, useState } from "react";

function App() {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [totalClients, setTotalClients] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(100);

  const [identificacion, setIdentificacion] = useState('');

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
    <div>
      {
        clients.map((client, index) => (
          <div key={index} style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', gap: 10}}>
            <p>{++index}</p>
            <h3>{client.NOMBRES}</h3>
            <p>{client.DOCUMENTO}</p>
          </div>
        ))
      }
    </div>
  )
}

export default App
