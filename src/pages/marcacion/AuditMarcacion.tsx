import { useEffect, useState } from "react";
import { AuditMarcaciones } from "../../types/marcacion";
import axios from "axios";
import { URL_API } from "../../utils/contants";

export default function AuditMarcacion() {
  const [data, setData] = useState<AuditMarcaciones[]>([]);

  useEffect(() => {
    axios.get(`${URL_API}/audit-marcacion`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return(
    <section>
      <h1>Lista de Marcaciones</h1>
      <table>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Hora Marcación</th>
            <th>Estado Marcación</th>
            <th>Hora Inicio</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.nombres}</td>
              <td>{item.apellidos}</td>
              <td>{item.hora_marcacion}</td>
              <td>{item.estado_marcacion}</td>
              <td>{item.hora_inicio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}