const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)
module.exports.searchSchema = Joi.object({
    q: Joi.string().required().escapeHTML()
})
module.exports.internshipSchema = Joi.object({
    internship: Joi.object({
        title: Joi.string().required().escapeHTML(),
        salary: Joi.number().required().min(0),
        area: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        company: Joi.string().required().escapeHTML(),
        link: Joi.string().required(),
        description: Joi.string().required().escapeHTML(),
        state: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array(),
    deleteImagesURL: Joi.array(),
    generate: Joi.string()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()
})

