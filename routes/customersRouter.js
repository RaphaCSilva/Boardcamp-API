import { Router } from "express";
import { getCustomers, getCustomer, postCustomer, updateCustomer } from "../controllers/customersController.js";
import { validaCustomer } from "../middlewares/validaCustomer.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomer);
customersRouter.post("/customers", validaCustomer, postCustomer);
customersRouter.put("/customers", validaCustomer, updateCustomer);

export default customersRouter;