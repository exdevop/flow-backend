const Joi = require('joi');

module.exports.validationMiddleware = (schema, property) => {
  return (req, res, next) => {
    const mySchema = Joi.object().keys(schema)
    mySchema.validateAsync(req[property], {
      convert: req.method === 'GET',
      abortEarly: false
    }).then((results) => {
      next()
    }).catch((err) => {
      const {details} = err
      console.log(err)
      res.status(400).send(details[0].message)
    })
  }
}