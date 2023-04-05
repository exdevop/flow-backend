const Joi = require('joi');

module.exports.appSchema = {
  organisation: {
    name: Joi.string().trim(true).required(),
    logoUrl: Joi.string().trim(true).required(),
    address: Joi.string().trim(true).optional(),
    description: Joi.string().trim(true).optional()
  },
  agents: {
    firstName: Joi.string().trim(true).required(),
    lastName: Joi.string().trim(true).required(),
    email: Joi.string().trim(true).required(),
    contactNumber: Joi.string().trim(true).required(),
    profileImageUrl: Joi.string().trim(true).required()
  },
  propertyItem: {
    agent: Joi.string().trim(true).required(),
    title: Joi.string().trim(true).required(),
    description: Joi.string().trim(true).required(),
    status: Joi.string().trim(true).required(),
    organisation: Joi.string().trim(true).required(),
    listingType: Joi.string().trim(true).required(),
    listingSector: Joi.string().trim(true).required(),
    unit: Joi.object().keys({
      bedrooms: Joi.number().required(),
      bathrooms: Joi.number().required(),
      parking: Joi.number().required(),
      price: Joi.number().required()
    }).optional(),
    images: Joi.array().items(Joi.string()).required()
  }
}
