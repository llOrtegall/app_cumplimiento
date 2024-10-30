import { Premios } from '../models/premios.model';
import { Request, Response } from 'express';
import PowerBi from '../connection';
import { fn } from 'sequelize';

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
        label: `(${result1[1].Result1}) Menor a 15 UVT`
      },
      {
        id: 2,
        value: result1[1].Result2,
        label: `(${result1[1].Result2}) Entre 15 y 48 UVT`
      },
      {
        id: 3,
        value: result1[1].Result3,
        label: `(${result1[1].Result3}) Mayor a 48 UVT`
      }
    ]


    res.status(200).json([{ empresa: 'Multired', data }, { empresa: 'Servired', data: data2 }]);
    // res.status(200).json(result1);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
}

export const getInfo2 = async (req: Request, res: Response) => {
  try {
    const PremiosServired = await Premios.findAll({
      attributes: ['TIPOPREMIO', [fn('COUNT', 'TIPOPREMIO'), 'CANT']],
      where: { FECHAPAGO: fn('CURDATE'), ZONA: '39627' },
      group: ['TIPOPREMIO']
    })

    const PremiosMultired = await Premios.findAll({
      attributes: ['TIPOPREMIO', [fn('COUNT', 'TIPOPREMIO'), 'CANT']],
      where: { FECHAPAGO: fn('CURDATE'), ZONA: '39628' },
      group: ['TIPOPREMIO']
    });

    res.status(200).json({ Multired: PremiosMultired, Servired: PremiosServired });
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
}