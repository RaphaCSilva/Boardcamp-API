import rentalSchema from "../schemas/rentalSchema.js";

export function validaRental(req, res, next) {
    const rental = req.body;
    const validation = rentalSchema.validate(rental);
    if(validation.error) {
        return res.sendStatus(400);
    }

    next();
}