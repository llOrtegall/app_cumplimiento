import { validateUpdate } from '../schemas/update';
import { Client } from '../models/clientes.model';
import { Request, Response } from 'express';
import { Op } from 'sequelize';

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 100;
    const offset = (page - 1) * pageSize;

    const { count, rows } = await Client.findAndCountAll({
      where: {
        DOCUMENTO: { [Op.like]: `%${req.query.search}%` }
      },
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

export const getAllClientsNuevos = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 100;
    const offset = (page - 1) * pageSize;

    console.log(search);

    const { rows, count } = await Client.findAndCountAll({
      where: {
        DOCUMENTO: { [Op.like]: `%${search}%` },
        [Op.or]: [
          { CATEGORIA: { [Op.is]: null } },
          { TIPOZONA: { [Op.is]: null } }
        ]
      },
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
    const [client] = await Client.findAll({
      where: {
        DOCUMENTO: {
          [Op.eq]: id
        }
      }
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
    const results = await Client.findAll({
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

export const updateCliente = async (req: Request, res: Response) => {
  const { categoria, tipozona, documento } = req.body;

  if (!categoria || !tipozona || !documento) {
    res.status(400).json({ message: 'faltan Campos Requeridos' });
    return;
  }

  try {
    const [updated] = await Client.update({
      CATEGORIA: categoria,
      TIPOZONA: tipozona
    }, {
      where: { DOCUMENTO: documento }
    });

    if (!updated) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }

    res.status(200).json({ message: 'Client Actualizado Correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const updateClientes = async (req: Request, res: Response) => {
  const result = validateUpdate(req.body);

  if (!result.success) {
    res.status(400).json({ message: 'Invalid data' });
    return;
  }

  const { documentos, categoria, tipozona } = result.data;

  if(categoria === undefined && tipozona === undefined) {
    res.status(400).json({ message: 'Se debe seleccionar mínimo un campo a actualizar' });
    return;
  }

  try {
    await Client.update({ CATEGORIA: categoria, TIPOZONA: tipozona }, {
      where: { DOCUMENTO: { [Op.in]: documentos } }
    });

    res.status(200).json({ message: 'Clientes Actualizados Correctamente' });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
}