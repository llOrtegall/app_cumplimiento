import { getInfo } from '../controllers/info.controllers';
import { Router } from "express";

export const infoRouter = Router();

infoRouter.get('/getInfo', getInfo);