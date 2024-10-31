import { Premios } from '../models/premios.model';
import { Request, Response } from 'express';
import { fn, literal, Op } from 'sequelize';

export const getInfo = async (req: Request, res: Response) => {

  const fecha: string | undefined = req.query.fecha as string | undefined;

  const cantMin = 15
  const cantMax = 48
  const UVT = 47065

  const menor15 = cantMin * UVT
  const mayor48 = cantMax * UVT

  const opc = fecha !== undefined && fecha !== 'undefined' ? fecha.slice(0, 10) : fn('CURDATE');

  try {
    const consultaMultired = await Premios.findAll({
      attributes: [
        [fn('SUM', literal(`PREMIO < ${menor15}`)), 'Menor'],
        [fn('SUM', literal(`PREMIO BETWEEN ${menor15} AND ${mayor48}`)), 'Rango'],
        [fn('SUM', literal(`PREMIO > ${mayor48}`)), 'Mayor']
      ],
      where: {
        FECHAPAGO: opc,
        ZONA: 39627
      }
    });

    const consultaServired = await Premios.findAll({
      attributes: [
        [fn('SUM', literal(`PREMIO < ${menor15}`)), 'Menor'],
        [fn('SUM', literal(`PREMIO BETWEEN ${menor15} AND ${mayor48}`)), 'Rango'],
        [fn('SUM', literal(`PREMIO > ${mayor48}`)), 'Mayor']
      ],
      where: {
        FECHAPAGO: opc,
        ZONA: 39628
      }
    });

    const dataMultired = [
      { id: 1, label: 'Menor a 15 UVT', value: parseInt(consultaMultired[0].get('Menor') as unknown as string) },
      { id: 2, label: 'Entre 15 y 48 UVT', value: parseInt(consultaMultired[0].get('Rango') as unknown as string) },
      { id: 3, label: 'Mayor a 48 UVT', value: parseInt(consultaMultired[0].get('Mayor') as unknown as string) }
    ]

    const dataServired = [
      { id: 1, label: 'Menor a 15 UVT', value: parseInt(consultaServired[0].get('Menor') as unknown as string) },
      { id: 2, label: 'Entre 15 y 48 UVT', value: parseInt(consultaServired[0].get('Rango') as unknown as string) },
      { id: 3, label: 'Mayor a 48 UVT', value: parseInt(consultaServired[0].get('Mayor') as unknown as string)}
    ]


    res.status(200).json([{ empresa: 'Multired', data: dataMultired }, { empresa: 'Servired', data: dataServired }]);
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