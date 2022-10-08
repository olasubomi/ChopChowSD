const {
    signUpSchema,
    resetPasswordSchema,
    loginSchema,
} = require("./userInputValidator");
const { createMealSchema } = require("./mealsInputValidator");

module.exports = {
    signUpSchema,
    resetPasswordSchema,
    loginSchema,
    createMealSchema,
};
