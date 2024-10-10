import { getAllClients, getClientById, getClientByFN, updateCliente, getAllClientsNuevos } from '../controllers/clientes.controllers';

// TODO: este es una funcion que solo se usa para pruebas
import { insertTest } from '../controllers/insertTest';

import { Router } from 'express';

const clientRoutes = Router();

clientRoutes.get('/clientes', getAllClients);

clientRoutes.get('/clientesNevos', getAllClientsNuevos);

clientRoutes.get('/cliente/:id', getClientById)

clientRoutes.post('/clienteFN', getClientByFN)

clientRoutes.post('/updateCliente', updateCliente)

clientRoutes.get('/crearMasivo', insertTest)

export { clientRoutes };