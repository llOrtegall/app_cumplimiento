import { getInfo, getInfo2 } from '../controllers/info.controllers';
import { Router } from "express";

export const infoRouter = Router();

infoRouter.get('/getInfo', getInfo);

infoRouter.get('/getInfo2', getInfo2);
