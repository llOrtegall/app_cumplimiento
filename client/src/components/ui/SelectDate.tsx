import { Dispatch, SetStateAction } from 'react';
import { Calendar } from '../Calendar';
import { es } from 'date-fns/locale';

export const CalendarLocaleExample = (
  { date, setdate }: 
  { date: Date | undefined, setdate: Dispatch<SetStateAction<Date | undefined>> }
) => {
  return (
    <div className='flex flex-col items-center gap-y-4'>
      <Calendar locale={es} selected={date} onSelect={setdate} />
      <p className='rounded bg-gray-100 p-2 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-300'>
        Date seleccionado: {date ? date.toLocaleDateString() : 'None'}
      </p>
    </div>
  )
}