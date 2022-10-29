import { Router } from "express";
import { checkSchema } from "../middlewares/checkSchema.js";
import { rentSchema } from "../schemas/rentSchema.js";
import { addElement, getElements } from "../controllers/rentsController.js";

export const rentsRouter = Router();

rentsRouter.post('/rents', checkSchema(rentSchema), addElement);
rentsRouter.get('/rents', getElements);