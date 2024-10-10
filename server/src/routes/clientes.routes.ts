import { getAllClients, getClientById, getClientByFN, updateCliente, getAllClientsNuevos } from '../controllers/clientes.controllers';
import { Router } from 'express';

const clientRoutes = Router();

clientRoutes.get('/clientes', getAllClients);

clientRoutes.get('/clientesNevos', getAllClientsNuevos);

clientRoutes.get('/cliente/:id', getClientById)

clientRoutes.post('/clienteFN', getClientByFN)

clientRoutes.post('/updateCliente', updateCliente)


export { clientRoutes };