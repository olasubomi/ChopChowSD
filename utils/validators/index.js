const {
    signUpSchema,
    resetPasswordSchema,
    loginSchema,
} = require("./userInputValidator");
const { createMealSchema } = require("./mealsInputValidator");

const { createCommentSchema, replyCommentSchema, updateCommentSchema } = require("./commentValidator")

module.exports = {
    signUpSchema,
    resetPasswordSchema,
    loginSchema,
    createMealSchema,
    createCommentSchema,
    replyCommentSchema,
    updateCommentSchema
};
