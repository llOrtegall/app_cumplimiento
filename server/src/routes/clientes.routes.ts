import { getAllClients, getClientById } from '../controllers/clientes.controllers';
import { Router } from 'express';

const clientRoutes = Router();

clientRoutes.get('/clientes', getAllClients);

clientRoutes.get('/cliente/:id', getClientById)


export { clientRoutes };