import { PieChart } from '@mui/x-charts/PieChart';
import { URL_API_DATA } from '../utils/contanst';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '../components/BarChart';

interface DataCompany {
  id: number,
  value: number,
  label: string
}

interface DataCompany2 {
  TIPOPREMIO: string
  CANT: number
}

interface Data {
  empresa: string,
  data: DataCompany[],
}

interface Data2 {
  Multired: DataCompany2[],
  Servired: DataCompany2[],
}

export default function Dashboard() {
  const [data, setData] = useState<Data[]>([]);
  const [data2, setData2] = useState<Data2>();

  useEffect(() => {
    axios.get(`${URL_API_DATA}/getInfo`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    axios.get(`${URL_API_DATA}/getInfo2`)
      .then(res => {
        console.log(res.data);
        setData2(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])


  return (
    <div className='w-full flex flex-col'>
      <section className='flex'>
        {
          data.map((item, index) => (
            <div key={index} className='w-1/2 flex flex-col justify-center items-center p-2 space-y-2 rounded-md m-2'>
              <h1 className='text-2xl font-bold'>{item.empresa}</h1>
              <PieChart
                series={[{
                  data: item.data,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  innerRadius: 70,
                  outerRadius: 100,
                  cornerRadius: 10,
                }]}
                height={200}
                width={550}
              />
            </div>
          ))
        }
      </section>

      <section className='w-full'>
        <h2 className='text-center font-semibold uppercase'>
          Cantidad de premios por tipo de premio
        </h2>
        {
          data2 && (
            data2.Multired.length > 0 && (
              <section className='flex justify-around'>
                <div className='w-[40%]'>
                  <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
                    Multired Premios
                  </p>
                  <BarChart
                    title='Multired'
                    className='h-80'
                    data={data2.Multired}
                    index='TIPOPREMIO'
                    categories={['CANT']}
                    yAxisWidth={80}
                    layout='vertical'
                  />
                </div>
                <div className='w-[40%]'>
                  <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
                    Servired Premios
                  </p>
                  <BarChart
                    title='Servired'
                    className='h-80'
                    data={data2.Servired}
                    index='TIPOPREMIO'
                    categories={['CANT']}
                    yAxisWidth={80}
                    layout='vertical'
                  />
                </div>

              </section>
            )
          )
        }
      </section>
    </div>
  )
}