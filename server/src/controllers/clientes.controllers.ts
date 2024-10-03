import { Op } from 'sequelize';
import ClientModel from '../models/clientes.model';
import { Request, Response } from 'express';

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 100;
    const offset = (page - 1) * pageSize;

    const { count, rows } = await ClientModel.findAndCountAll({
      limit: pageSize,
      offset: offset,
      order: [['DOCUMENTO', 'desc']]
    });

    res.status(200).json({ count, clients: rows, page, pageSize });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getClientById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const client = await ClientModel.findAll({
      where: { DOCUMENTO: {
        [Op.like]: `%${id}%`
      } }
    });

    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }

    res.status(200).json(client);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getClientByFN = async (req: Request, res: Response) => {
  const { FN } = req.body;

  console.log(FN);

  try {
    const results = await ClientModel.findAll({
      where: {
        FECHANACIMIENTO: FN
      }
    });

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}