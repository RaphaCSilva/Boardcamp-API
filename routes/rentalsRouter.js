import { Router } from "express";
import { validaRental } from "../middlewares/validaRental.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals");
rentalsRouter.post("/rentals", validaRental);
rentalsRouter.post("/rentals/:id/return");
rentalsRouter.delete("/rentals/:id");

export default rentalsRouter;