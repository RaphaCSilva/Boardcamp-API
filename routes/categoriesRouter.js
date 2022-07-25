import { Router } from "express";
import { getCategories, postCategories } from "../controllers/categoriesControllers.js";
import { validaCategoria } from "../middlewares/validaCategoria.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", validaCategoria, postCategories);


export default categoriesRouter;