const Joi = require("joi");

exports.createMealSchema = Joi.object({
    meal_name: Joi.string().required().messages({
        "string.base": ` meal name should be of type string`,
        "string.empty": `meal name cannot be an empty field`,
        "any.required": `meal name is a required.`,
    }),
    meal_images: Joi.array().messages({
        "string.base": ` meal image should be of type array of string`,
        "string.empty": `meal image cannot be an empty field`,
        "any.required": `meal image is a required.`,
    }),
    prep_time: Joi.string().required().messages({
        "string.base": ` prep time should be of type string`,
        "string.empty": `prep time cannot be an empty field`,
        "any.required": `prep time is a required.`,
    }),
    status:Joi.boolean().messages({
        "string.base": `status must be a boolean`,
    }),
    cook_time: Joi.string().required().messages({
        "string.base": ` cook time should be of type string`,
        "string.empty": `cook time cannot be an empty field`,
        "any.required": `cook time is a required.`,
    }),
    intro: Joi.string().required().messages({
        "string.base": ` intro should be of type string`,
        "string.empty": `intro cannot be an empty field`,
        "any.required": `intro is a required.`,
    }),
    chef: Joi.string().messages({
        "string.base": `chef should be of type string`,
        "string.empty": `chef cannot be an empty field`,
        "any.required": `chef is a required.`,
    }),
    formatted_ingredients: Joi.array().required().messages({
        "string.base": ` formated ingredients should be of type array of strings`,
        "string.empty": `formated ingredients cannot be an empty field`,
        "any.required": `formated ingredients is a required.`,
    }),
    formatted_instructions: Joi.array().required().messages({
        "string.base": ` formated instructions should be of type array of strings`,
        "string.empty": `formated instructions cannot be an empty field`,
        "any.required": `formated instructions is a required.`,
    }),
    servings: Joi.string().optional().messages({
        "string.base": `servings   should be of type string`,
    }),
    meal_categories: Joi.array().optional().messages({
        "string.base": `meal categories should be of type array of string`,
    }),

    kitchen_utensils: Joi.array().optional().messages({
        "string.base": `kitchen utensils should be of type array of string`,
    }),
    tips: Joi.array().optional().messages({
        "string.base": `tips should be of type array of string`,
    }),
    image_or_video_content: Joi.array().optional().messages({
        "string.base": `image or video  should be of type array of string`,
    }),
    stores_available: Joi.array().optional().messages({
        "string.base": `stores available  should be of type array of string`,
    }),
    formatted_ingredients: Joi.array().optional().messages({
        "string.base": `formatted ingredients  should be of type array of string`,
    }),
    formatted_instructions: Joi.array().optional().messages({
        "string.base": `formatted instructions  should be of type array of string`,
    }),
    calories: Joi.string().optional().messages({
        "string.base": `calories should be of type string`,
    }),

    total_carbs: Joi.string().optional().messages({
        "string.base": `total carbs should be of type string`,
    }),

    net_carbs: Joi.string().optional().messages({
        "string.base": `net carbs should be of type string`,
    }),

    fiber: Joi.string().optional().messages({
        "string.base": `fiber should be of type string`,
    }),

    fat: Joi.string().optional().messages({
        "string.base": `fiber should be of type string`,
    }),

    protein: Joi.string().optional().messages({
        "string.base": `fiber should be of type string`,
    }),
});
