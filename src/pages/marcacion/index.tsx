import { type Marcacion } from '../../types/marcacion'
import MarcacionesList from './marcacionList'

export default function Marcacion() {

  return (
    <section className='h-[90vh] overflow-y-auto'>
      <MarcacionesList />
    </section>
  )
}