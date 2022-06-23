const joi=require('@hapi/joi');


const registerValidation=(data)=>{
   
    const schema=joi.object ({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).email(),
        password: joi.string().min(6).required()
    })

    return schema.validate(data);
}


const loginValidation=(data)=>{
    
    const schema=joi.object ({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).email(),
        password: joi.string().min(6).required()
    })
}



module.exports={registerValidation,loginValidation}
