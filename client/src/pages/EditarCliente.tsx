import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/Select';

interface Cliente {
  CATEGORIA: string;
  DIRECCION: string;
  DOCUMENTO: string;
  EMAIL: string;
  FECHACARGA: string;
  FECHANACIMIENTO: string;
  NOMBRES: string;
  PEP: string;
  TELEFONO1: string;
  TELEFONO2: string;
  TIPODOCUMENTO: string;
  TIPOZONA: string;
  VERSION: string;
}

const data = [
  { value: 'null', label: 'Seleccionar' },
  { value: 'CL', label: 'CL' },
  { value: 'TR', label: 'TR' },
  { value: 'AC', label: 'AC' },
  { value: 'CI', label: 'CI' },
  { value: 'CC', label: 'CC' }
]

const data2 = [
  { value: 'null', label: 'Seleccionar' },
  { value: 'N/A', label: 'N/A' },
  { value: 'URBANO', label: 'URBANO' },
  { value: 'RUAL', label: 'RUAL' }
]

function EditarCliente() {
  const { id } = useParams();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchClientById = async () => {
      try {
        const response = await fetch(`http://172.20.1.70:3030/cliente/${id}`);
        const data = await response.json()
        setCliente(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClientById();
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target as HTMLFormElement))

    console.log(fields);

    const { categoria, tipozona, documento } = fields;
    if (!categoria || !tipozona || !documento) {
      alert('Los Campos categoría y tipo de zona son obligatorios');
      return;
    }

    fetch('http://172.20.1.70:3030/updateCliente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoria, tipozona, documento })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        toast.success(data.message || 'Cliente actualizado correctamente', { description: 'Cambio de información del cliente' });
        setTimeout(() => {
          formRef.current?.reset();
        }, 5000);
      })
      .catch(error => {
        console.error('Error updating client:', error)
        toast.error('Error al actualizar cliente', { description: 'Cambio de información del cliente' });
      });
  }

  return (
    <>
      {
        cliente ? (
          <section className='p-4'>
            <h1 className='text-2xl font-bold text-center pb-2'>Editar cliente</h1>
            <form ref={formRef} className='grid grid-cols-3 gap-4 max-w-[1200px] m-auto' onSubmit={handleSubmit}>
              <div>
                <Label>Nombres</Label>
                <Input name='nombres' defaultValue={cliente.NOMBRES} readOnly />
              </div>
              <div>
                <Label>Documento</Label>
                <Input name='documento' defaultValue={cliente.DOCUMENTO} readOnly />
              </div>
              <div>
                <Label>Tipo de documento</Label>
                <Input name='tipodocumento' defaultValue={cliente.TIPODOCUMENTO} readOnly />
              </div>
              <div>
                <Label>Fecha de nacimiento</Label>
                <Input name='fechanacimiento' defaultValue={cliente.FECHANACIMIENTO} readOnly />
              </div>
              <div>
                <Label>Dirección</Label>
                <Input name='direccion' defaultValue={cliente.DIRECCION} readOnly />
              </div>
              <div>
                <Label>Correo</Label>
                <Input name='nombres' defaultValue={cliente.EMAIL} readOnly />
              </div>
              <div>
                <Label>Telefono 1</Label>
                <Input name='telefono1' defaultValue={cliente.TELEFONO1} readOnly />
              </div>
              <div>
                <Label>Telefono 2</Label>
                <Input name='telefono2' defaultValue={cliente.TELEFONO2} readOnly />
              </div>
              <div>
                <Label>PEP</Label>
                <Input name='pep' defaultValue={cliente.PEP} readOnly />
              </div>
              <div>
                <Label>Categoria</Label>
                {/* <Input name='categoria' defaultValue={cliente.CATEGORIA} /> */}
                <Select defaultValue={'null'} name='categoria'>
                  <SelectTrigger className='mx-auto'>
                    <SelectValue placeholder='Select' />
                  </SelectTrigger>
                  <SelectContent>
                    {data.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <span className='flex justify-between gap-x-2'>
                          {/* <item.icon className='size-4 shrink-0 text-gray-500 dark:text-gray-500' aria-hidden='true' /> */}
                          {item.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tipo de zona</Label>
                {/* <Input name='tipozona' defaultValue={cliente.TIPOZONA} /> */}
                <Select defaultValue={'null'} name='tipozona'>
                  <SelectTrigger className='mx-auto'>
                    <SelectValue placeholder='Select' />
                  </SelectTrigger>
                  <SelectContent>
                    {data2.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <span className='flex justify-between gap-x-2'>
                          {/* <item.icon className='size-4 shrink-0 text-gray-500 dark:text-gray-500' aria-hidden='true' /> */}
                          {item.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Fecha de carga</Label>
                <Input name='fechacarga' defaultValue={cliente.FECHACARGA} readOnly />
              </div>

              <div className='col-span-1'>
                <button type='submit' className='w-full bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded'>
                  Guardar
                </button>
              </div>
            </form>
          </section>
        ) : (
          <div>
            No se encontro cliente
          </div>
        )
      }
    </>
  )
}

export default EditarCliente;