import { Router } from "express";
import { validaRental } from "../middlewares/validaRental.js";
import { getRentals, postRental, updateRental, deleteRental } from "../controllers/rentalsControllers.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validaRental, postRental);
rentalsRouter.post("/rentals/:id/return", updateRental);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;