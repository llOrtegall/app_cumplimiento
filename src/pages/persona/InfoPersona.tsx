import { Label } from '../../components/ui/Label';
import { OnePersona } from '../../types/Persona';
import { URL_API } from '../../utils/contants';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../../components/ui/Input';

export default function InfoPersona() {
  const { id } = useParams();
  const [persona, setPersona] = useState<OnePersona>();

  useEffect(() => {
    axios.get(`${URL_API}/persona/${id}`)
      .then(response => setPersona(response.data))
      .catch(error => console.log(error));
  }, [])

  return (
    <section className=''>
      <h1 className='text-center py-4 text-2xl font-semibold'>Información Empleado</h1>
      {
        persona && (
          <form className='grid bg-blue-200 px-12 py-4 grid-cols-4 gap-2'>
            <div>
              <Label>Identificación</Label>
              <Input />
            </div>
            <div>
              <Label>Nombres</Label>
              <Input />
            </div>
            <div>
              <Label>Apellidos</Label>
              <Input />
            </div>
            <div>
              <Label>Email</Label>
              <Input />
            </div>
            <div>
              <Label>Dirección</Label>
              <Input />
            </div>
            <div>
              <Label>Ciudad</Label>
              <Input />
            </div>
            <div>
              <Label>Tipo Persona</Label>
              <Input />
            </div>
            <div>
              <Label>RH</Label>
              <Input />
            </div>
            <div>
              <Label>Teléfono</Label>
              <Input />
            </div>
            <div>
              <Label>Observaciones</Label>
              <Input />
            </div>
            <div>
              <Label>Código Nómina</Label>
              <Input />
            </div>
            <div>
              <Label>Estado</Label>
              <Input />
            </div>
          </form>)
      }
    </section>
  )
}