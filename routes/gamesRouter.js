import { Router } from "express";
import { getGames, postGame } from "../controllers/gamesControllers.js";
import { validaGame } from "../middlewares/validaGame.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("games", validaGame, postGame);

export default gamesRouter;