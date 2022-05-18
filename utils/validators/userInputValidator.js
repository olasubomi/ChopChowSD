const Joi = require('joi');


const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    firstname:Joi.string().required(),
    lastname:Joi.string().required(),
    password:Joi.string().required(),
    username:Joi.string().required(),
    phonenumber:Joi.string(),
    emailnotification: Joi.boolean()
})      

const loginSchema = Joi.object({
    email: Joi.string().email().required(), 
    password:Joi.string().required(),
})

const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    password1:Joi.string().required(),
    password2:Joi.string().valid(Joi.ref('password1')).required(),
})  

module.exports={
    signUpSchema,
    resetPasswordSchema,
    loginSchema
}
