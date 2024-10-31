import { Premios } from '../models/premios.model';
import { Request, Response } from 'express';
import { fn, literal, Op } from 'sequelize';

export const getInfo = async (req: Request, res: Response) => {

  const fecha = req.query.fecha;

  const cantMin = 15
  const cantMax = 48
  const UVT = 47065

  const menor15 = cantMin * UVT
  const mayor48 = cantMax * UVT

   const opc = fecha !== undefined ? fecha as string : fn('CURDATE')

  try {
    const consultaMultired = await Premios.findAll({
      attributes: [
        [fn('SUM', literal(`PREMIO < ${menor15}`)), 'Menor a 15 UVT'],
        [fn('SUM', literal(`PREMIO BETWEEN ${menor15} AND ${mayor48}`)), 'Rango [15 - 48] UVT'],
        [fn('SUM', literal(`PREMIO > ${mayor48}`)), 'Mayor a 48 UVT']
      ],
      where: {
        FECHAPAGO: opc,
        ZONA: 39627
      }
    });

    const consultaServired = await Premios.findAll({
      attributes: [
        [fn('SUM', literal(`PREMIO < ${menor15}`)), 'Menor a 15 UVT'],
        [fn('SUM', literal(`PREMIO BETWEEN ${menor15} AND ${mayor48}`)), 'Rango [15 - 48] UVT'],
        [fn('SUM', literal(`PREMIO > ${mayor48}`)), 'Mayor a 48 UVT']
      ],
      where: {
        FECHAPAGO: opc,
        ZONA: 39628
      }
    });


    res.status(200).json([{ empresa: 'Multired', data: consultaMultired }, { empresa: 'Servired', data: consultaServired }]);
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