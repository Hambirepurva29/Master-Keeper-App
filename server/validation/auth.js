import joi from "joi";

export const ValidateSignup = (userData) => {
    const Schema = joi.object({
        fullname:joi.string()
            .min(3)
            .required(),
        email: joi.string().email(),
        password: joi.string().min(5)
});  
    return Schema.validateAsync(userData);
};

export const ValidateSignin = (userData) => {

    const Schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(5).required()
    });
    
    return Schema.validateAsync(userData);
    
    };