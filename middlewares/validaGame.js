import gameSchema from "../schemas/gameSchema.js";

export function validaGame(req, res, next) {
    const jogo = req.body;
    const validation = gameSchema.validate(jogo);
    if (validation.error) {
        return res.sendStatus(400);
    }

    next();
}