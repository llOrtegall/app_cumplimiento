import { Request, Response } from 'express';
import PowerBi from '../connection';

export const getInfo = async (req: Request, res: Response) => {
  try {
    const [result1] = await PowerBi.query(`
      SELECT FECHAPAGO, 
      case ZONA
      when '39627' then 'Multired'
      when '39628' then 'Servired'
      else 'null' end AS EMPRESA, 
      COUNT(CASE WHEN PREMIO < 15*47065 THEN 1 END) AS Result1,
      COUNT(CASE WHEN PREMIO between 15*47065 and 48*47065 THEN 1 END) AS Result2,
      COUNT(CASE WHEN PREMIO > 48*47065 THEN 1 END) AS Result3
      FROM DETALLEPREMIOSCMP
      WHERE FECHAPAGO=CURDATE()
      GROUP BY FECHAPAGO,ZONA`
    );

    const data = [
      {
        id: 1, 
        value: result1[0].Result1,
        label: ` (${result1[0].Result1}) Menor a 15 UVT`
      },
      {
        id: 2, 
        value: result1[0].Result2,
        label: ` (${result1[0].Result2}) Entre 15 y 48 UVT`
      },
      {
        id: 3, 
        value: result1[0].Result3,
        label: ` (${result1[0].Result3}) Mayor a 48 UVT`
      }
    ]

    const data2 = [
      {
        id: 1, 
        value: result1[1].Result1,
        label: ` (${result1[1].Result1}) Menor a 15 UVT`
      },
      {
        id: 2, 
        value: result1[1].Result2,
        label: ` (${result1[1].Result2}) Entre 15 y 48 UVT`
      },
      {
        id: 3, 
        value: result1[1].Result3,
        label: ` (${result1[1].Result3}) Mayor a 48 UVT`
      }
    ]


    res.status(200).json([{ empresa: 'Multired', data }, { empresa: 'Servired', data: data2 }]);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
}
