import { ModalDelete } from "../../../components/ModalDelete";
import { type Turnos } from "../../../types/Interfaces";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { URL_API } from "../../../utils/contants";
import axios from "axios";
import { toast } from "sonner";


export default function Turnos() {
  const [turnos, setturnos] = useState<Turnos[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [request, setRequest] = useState<boolean>(false);
  const [turnoDelete, setTurnoDelete] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get(`${URL_API}/turnos`)
      .then(response => {
        setturnos(response.data)
        setRequest(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [request]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fields = Object.fromEntries(new window.FormData(e.target as HTMLFormElement));
    
    const turno = {
      codigo: fields.codigo,
      descripcion: fields.nombre_turno,
      hora_inicio: fields.hora_inicio,
      hora_fin: fields.hora_fin,
      teorico: fields.teorico,
      hora_inicio_break: fields.hora_inicio_break,
      hora_fin_break: fields.hora_fin_break,
      tiempo_breack: fields.tiempo_breack,
      conceptos: fields.conceptos
    }

    axios.post(`${URL_API}/turno`, turno)
      .then(response => {
        if(response.status === 201) {
          toast.success('El turno se creó correctamente', { description: 'Turno creado' });
          setRequest(true);
          formRef.current?.reset();
        }
      })
      .catch(error => {
        console.log(error);
        toast.error(error.response?.data?.message || 'Error', { description: 'Error al crear el turno' });
      })    
  }

  const confirmDeleteTurno = () => {
    if (turnoDelete !== null) {
      axios.delete(`${URL_API}/turno/${turnoDelete}`)
        .then(response => {
          if (response.status === 200) {
            toast.success('El cargo se eliminó correctamente', { description: 'turno eliminado' });
            setRequest(true);
          }
        })
        .catch(error => {
          console.log(error);
          toast.error(error.response?.data?.message || 'Error', { description: 'Error al eliminar el turno' });
        })
        .finally(() => {
          closeModal();
        });
    }
  };

  const openModal = (id: number) => {
    setTurnoDelete(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setTurnoDelete(null);
  };


  return (
    <section className="p-1 flex flex-col h-[90vh] relative">
      <table className="w-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto">
        <thead className="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">CODIGO</th>
            <th className="px-6 py-3">Nombre turno</th>
            <th className="px-6 py-3">Horas Total Día</th>
            <th className="px-6 py-3">Hora Inicio</th>
            <th className="px-6 py-3">Hora Fin</th>
            <th className="px-6 py-3">Hora Inicio Break</th>
            <th className="px-6 py-3">Hora Final Break</th>
            <th className="px-6 py-3">Tiempo Breack</th>
            <th className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            turnos.map(turno => (
              <tr key={turno.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  ">
                <td className="px-6 py-4">{turno.codigo}</td>
                <td className="px-6 py-4">{turno.descripcion}</td>
                <td className="px-6 py-4">{turno.teorico.split(':', 1)} h</td>
                <td className="px-6 py-4">{turno.hora_inicio}</td>
                <td className="px-6 py-4">{turno.hora_fin}</td>
                <td className="px-6 py-4">{turno.tolerancia_despues_entrada}</td>
                <td className="px-6 py-4">{turno.tolerancia_antes_salir}</td>
                <td className="px-6 py-4">{turno.tiempo_breack}</td>
                <td className='px-6 py-4 flex gap-2'>
                  {/* <button className='bg-yellow-300 hover:bg-yellow-400 text-black px-2 py-1 rounded-md' // onClick={() => updateturno(turno)}
                  >Editar</button> */}
                  <button className='bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded-md' onClick={() => openModal(turno.id)}
                  >Eliminar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <section className="mt-auto border rounded-md bg-gray-200 py-8">
        <form ref={formRef} onSubmit={ev => handleSubmit(ev)}>

          <section className="grid grid-cols-4 gap-4 px-4">
            <div className="mb-5">
              <Label name="codigo">Codigo</Label>
              <Input type="text" name="codigo" id="codigo" required />
            </div>

            <div>
              <Label name="nombre_turno" >Nombre Turno</Label>
              <Input type="text" name="nombre_turno" id="nombre_turno" required />
            </div>

            <div>
              <Label name="teorico" >Horas Total Día</Label>
              <Input type="text" name="teorico" id="teorico" required />
            </div>
          </section>

          <section className="grid grid-cols-4 gap-4 px-4">
            <div>
              <Label name="hora_inicio" >Hora Inicio</Label>
              <Input type="time" name="hora_inicio" id="hora_inicio" required />
            </div>

            <div>
              <Label name="hora_fin" >Hora Fin</Label>
              <Input type="time" name="hora_fin" id="hora_fin" required />
            </div>

            <div>
              <Label name="hora_inicio_break" >Hora Inicio Break</Label>
              <Input type="time" name="hora_inicio_break" id="hora_inicio_break" required />
            </div>

            <div>
              <Label name="hora_fin_break" >Hora Final Break</Label>
              <Input type="time" name="hora_fin_break" id="hora_fin_break" required />
            </div>

            <div>
              <Label name="tiempo_breack" >Tiempo Break ó Lunch</Label>
              <Input type="text" name="tiempo_breack" id="tiempo_breack" required />
            </div>

            <div className="col-span-2">
              <Label name="conceptos" >Concepto</Label>
              <Input type="text" name="conceptos" id="conceptos" />
            </div>

            <button type="submit" className="bg-green-600 my-3 text-white text-xl font-semibold rounded-md hover:bg-green-700">
              Crear Turno
            </button>

          </section>
        </form>
      </section>

      {modalIsOpen && <ModalDelete funAction={confirmDeleteTurno} onCancel={closeModal} />}

    </section>
  );
}