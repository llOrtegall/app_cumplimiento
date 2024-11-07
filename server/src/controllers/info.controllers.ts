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

export const reportBaloto = async (req: Request, res: Response) => {
  const fecha1: string | undefined = req.query.fecha as string | undefined;
  const fecha2: string | undefined = req.query.fecha as string | undefined;

  const zona: string = req.query.zona as string;

  if (fecha1 === undefined || fecha2 === undefined) {
    return res.status(400).json('Fecha no válida');
  }

  if (zona === undefined) {
    return res.status(400).json('Zona no válida');
  }

  try {
    const reportBaloto = await Premios.findAll({
      attributes: ['SERIE_CONSECUTIVO', 'TIPOPREMIO', 'PREMIO', 'RETEFUENTE', 'CAJERO', 'FECHAPAGO', 'TERCERO', 'ESTADO', 'EMPRESA'],
      where: {
        FECHAPAGO: { $between: [fecha1, fecha2] },
        TIPOJUEGO: { $in: [110, 116, 119] },
        ZONA: zona
      }
    });


    res.status(200).json(reportBaloto);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }

}