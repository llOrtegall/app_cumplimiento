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