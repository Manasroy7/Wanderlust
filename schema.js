const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string()
        .min(3)
        .max(30)
        .required(),

        description: Joi.string()
        .min(5)
        .max(100)
        .required(),

        location: Joi.string().required(),

        country: Joi.string().required(),

        price: Joi.number()
        .min(3)
        .required(),

        image: Joi.string().allow("", null)
    }).required()
});


// reviews schema
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number()
        .min(1)
        .max(5)
        .required(),
        comment: Joi.string().required(),
    }).required(),
})