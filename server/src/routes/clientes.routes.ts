import { getAllClients } from '../controllers/clientes.controllers';
import { Router } from 'express';

const clientRoutes = Router();

clientRoutes.get('/clientes', getAllClients);


export { clientRoutes };