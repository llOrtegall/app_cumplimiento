import { getAllClients, getClientById, getClientByFN } from '../controllers/clientes.controllers';
import { Router } from 'express';

const clientRoutes = Router();

clientRoutes.get('/clientes', getAllClients);

clientRoutes.get('/cliente/:id', getClientById)

clientRoutes.post('/clienteFN', getClientByFN)


export { clientRoutes };