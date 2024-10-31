import { Premios } from '../models/premios.model';
import { Request, Response } from 'express';
import { fn, literal, Op } from 'sequelize';

const cantMin = 15
const cantMax = 48
const UVT = 47065

const menor15 = cantMin * UVT
const mayor48 = cantMax * UVT

interface ConsultaResultAttrib {
  Menor: string
  Rango: string
  Mayor: string
}

export const getInfo = async (req: Request, res: Response) => {

  const fecha: string | undefined = req.query.fecha as string | undefined;

  const opc = fecha !== undefined && fecha !== 'undefined' ? fecha.slice(0, 10) : fn('CURDATE');

  try {
    const consultaMultired: ConsultaResultAttrib[] = await Premios.findAll({
      attributes: [
        [fn('SUM', literal(`PREMIO < ${menor15}`)), 'Menor'],
        [fn('SUM', literal(`PREMIO BETWEEN ${menor15} AND ${mayor48}`)), 'Rango'],
        [fn('SUM', literal(`PREMIO > ${mayor48}`)), 'Mayor']
      ],
      where: {
        FECHAPAGO: opc,
        ZONA: 39627
      },
      raw: true
    }) as unknown as ConsultaResultAttrib[];

    const consultaServired: ConsultaResultAttrib[] = await Premios.findAll({
      attributes: [
        [fn('SUM', literal(`PREMIO < ${menor15}`)), 'Menor'],
        [fn('SUM', literal(`PREMIO BETWEEN ${menor15} AND ${mayor48}`)), 'Rango'],
        [fn('SUM', literal(`PREMIO > ${mayor48}`)), 'Mayor']
      ],
      where: {
        FECHAPAGO: opc,
        ZONA: 39628
      },
      raw: true
    }) as unknown as ConsultaResultAttrib[];
    
    const Multired = consultaMultired[0];
    const Servired = consultaServired[0];

    const dataMultired = [
      { id: 1, label: `${Multired.Menor} - Menor a 15 UVT`, value: parseInt(Multired.Menor) },
      { id: 2, label: `${Multired.Rango} - Entre 15 y 48 UVT`, value: parseInt(Multired.Rango) },
      { id: 3, label: `${Multired.Mayor} - Mayor a 48 UVT`, value: parseInt(Multired.Mayor) }
    ]

    const dataServired = [
      { id: 1, label: `${Servired.Menor} - Menor a 15 UVT`, value: parseInt(Servired.Menor) },
      { id: 2, label: `${Servired.Rango} - Entre 15 y 48 UVT`, value: parseInt(Servired.Rango) },
      { id: 3, label: `${Servired.Menor} - Mayor a 48 UVT`, value: parseInt(Servired.Mayor) }
    ]

    res.status(200).json([{ empresa: 'Multired', data: dataMultired }, { empresa: 'Servired', data: dataServired }]);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
}

export const getInfo2 = async (req: Request, res: Response) => {
  const fecha: string | undefined = req.query.fecha as string | undefined;

  const opc = fecha !== undefined && fecha !== 'undefined' ? fecha.slice(0, 10) : fn('CURDATE');

  try {
    const PremiosServired = await Premios.findAll({
      attributes: ['TIPOPREMIO', [fn('COUNT', 'TIPOPREMIO'), 'CANT']],
      where: { FECHAPAGO: opc, ZONA: '39627' },
      group: ['TIPOPREMIO']
    })

    const PremiosMultired = await Premios.findAll({
      attributes: ['TIPOPREMIO', [fn('COUNT', 'TIPOPREMIO'), 'CANT']],
      where: { FECHAPAGO: opc, ZONA: '39628' },
      group: ['TIPOPREMIO']
    });

    res.status(200).json({ Multired: PremiosMultired, Servired: PremiosServired });
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
}