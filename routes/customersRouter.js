import { Router } from "express";
import { getCustomers, getCustomerByID, postCustomer, updateCustomer } from "../controllers/customersController.js";
import { validaCustomer } from "../middlewares/validaCustomer.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerByID);
customersRouter.post("/customers", validaCustomer, postCustomer);
customersRouter.put("/customers", validaCustomer, updateCustomer);

export default customersRouter;