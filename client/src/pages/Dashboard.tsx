import { PieChart } from '@mui/x-charts/PieChart';
import { URL_API_DATA } from '../utils/contanst';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface DataCompany {
  id: number,
  value: number,
  label: string
}


interface Data {
  empresa: string,
  data: DataCompany[],
}

export default function Dashboard() {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    axios.get(`${URL_API_DATA}/getInfo`)
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])


  return (
    <div className='w-full flex'>
      {
        data.map((item) => (
          <div className='flex flex-col justify-center items-center p-2 space-y-2 rounded-md m-2'>
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
    </div>
  )
}