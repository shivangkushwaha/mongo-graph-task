const Joi=require("joi")

module.exports={

    signupSchema :Joi.object({
      userName      : Joi.string().required().messages({
        "string.base": `Username is required`,
        "string.empty": `Username is required`,
        "any.required": `Username is required`
      }).example("123@gmail.com"),
      password  : Joi.string().required().min(8).max(16).example("password between 8-16 character").messages({
        "string.base": `Password is required`,
        "string.empty": `Password should not be empty`,
        "any.required": `password is required`,
        "string.min"  : `Password accepted with minimum 8 characters length`,
        "string.max"  : `Password accepted with maximum 16 characters length`
      })
    }),

    loginSchema:Joi.object({
        userName      : Joi.string().required().messages({
        "string.base": `UserName is required`,
        "string.empty": `UserName is required`,
        "any.required": `UserName is required`
      }).example("123com"),
      password  : Joi.string().required().min(8).max(16).example("password between 8-16 character").messages({
        "string.base": `Password is required`,
        "string.empty": `Password should not be empty`,
        "any.required": `password is required`,
        "string.min"  : `Password accepted with minimum 8 characters length`,
        "string.max"  : `Password accepted with maximum 16 characters length`
      }),
    })
}