import joi from "joi";

const categoriaSchema = joi.object({
    name: joi.string().required()
});

export default categoriaSchema;