import { Premios } from '../models/premios.model';
import { CantidadPremios } from '../services';
import { Request, Response } from 'express';
import { fn } from 'sequelize';
import { generateData } from '../utils';


export const getInfo = async (req: Request, res: Response) => {
  const fecha: string | undefined = req.query.fecha as string | undefined;

  try {
    const Multired = await CantidadPremios(fecha, 39627);
    const Servired = await CantidadPremios(fecha, 39628);
    
    const dataMultired = generateData(Multired);
    const dataServired = generateData(Servired);

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