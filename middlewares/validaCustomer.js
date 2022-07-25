import categoriaSchema from "../schemas/categoriaSchema.js";

export function validaCustomer(req, res, next) {
    const categoria = req.body;
    const validation = categoriaSchema.validate(categoria);
    if(validation.error) {
        return res.sendStatus(400);
    }

    next();
}