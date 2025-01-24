const Joi = require('joi');

const validate = (section) => (objSchema) => {
    const validationSchema = Joi.object(objSchema);

    return async (req, res, next) => {
        try {
            await validationSchema.validateAsync(req[section]);
            return next();
        } catch (err) {
            res.status(400).send({ message: err.details[0].message });
        }
    };
};

module.exports = {
    body: validate('body'),
    params: validate('params'),
    query: validate('query')
};