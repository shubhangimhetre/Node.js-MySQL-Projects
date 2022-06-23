const knex = require('knex')({
    client: "mysql",
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'Shubh@7171',
        database : 'Turing'
    }
})

const { custom } = require('@hapi/joi')
const req = require('express/lib/request')
const jwt=require('jsonwebtoken')
const {registerValidation,loginValidation}=require('../validate')



exports.customer_update=async(req,res)=>{
    // console.log(req.body)
    const data=await knex('customer').select('*')
    var found = data.find(function(user){     
        if (user.customer_id==req.body.customer_id){ 
                return user   
            }})
    if (found){
        knex('customer').update(req.body).where('customer_id', found.customer_id)
        .then((data) =>{
            res.send({"Done": "data updated successfully!",data:data})
        }).catch((err) =>{
            res.send({'Msg': 'err check your data'})
        })       
    }else{
        res.json({error :true,message:"Email or password is wrong. data not found"})
        console.log('user did not found.You have to signup first.')
    }
}

//get customer by ID. The customer is getting by Token
exports.customer_by_id=async(req,res)=>{

    const customer_id=req.params.customer_id
    // const customer_id=
    const data=await knex('customer').select('*')
        var found = data.find(function(user){     ////checking if the user is already in the database
                if (user.customer_id==customer_id){ 
                        return user   
                }})
        if (found){res.json({error:false,message:"data present",data:found});  
        }else{
            res.json({error:true,message:"data absent"});
         }
}


//Register a customer
exports.customer_register=async(req,res)=>{
    //validate data 
    const {error}= await registerValidation({name:req.body.name,email:req.body.email,password:req.body.password});
    if (error){
        return res.status(400).send(error.details[0].message);
    }else{
        const data=await knex('customer').select('*')
        var found = data.find(function(user){     ////checking if the user is already in the database
                if (user.email==req.body.email){ 
                        return user   
                }})
        if (found){ res.json({error:false,message:"account already present using this email ",data:found});  
        }else{
            //create a new user
             knex('customer').insert(req.body).then(async()=>{     
                console.log("Data inserted")
                const data= await knex('customer').select('*')
                var found = data.find(function(user){ 
                    if (user.email==req.body.email){ 
                            return user   
                    }
                })
                if (found){
                    token = jwt.sign({id:found.id},"iamshubhangi",{expiresIn:"24hr"})
                    res.cookie("user",token)
                    res.send({"cutsomer":{"schema":found},"accessToken":token,"expires_in":"24hr"}) 
                }})
            .catch((err)=>{
                console.log(err);
                res.json({error: err.details[0].message,data: req.body})
                // res.send(err)
            })  
        }}

}

//sign in shoopping
exports.customer_login=async(req,res)=>{
    const {error}= await loginValidation(req.body);
    if (error){
        console.log(error)
        return res.status(400).send(error.details[0].message);
    }else{    
    const data=await knex('customer').select('*')
    var found = data.find(function(user){ 
            if (user.email==req.body.email){     
                if(user.password==req.body.password){
                    return user
                }}
        })
        if (found){
            res.json({error:false,message:"login successfully..",data:found})
        }else{
            res.json({
                error :true,
                message:"Email or password is wrong. data not found"
            })
            console.log('user did not found.You have to signup first.')}
    }


}

//update the address from customer
exports.customer_address=async(req,res)=>{
    const data=await knex('customer').select('*')
    var found = data.find(function(user){     
        if (user.customer_id==req.body.customer_id){ 
                return user   
            }})
    if (found){
        knex('customer').update({
            "customer_id":found.customer_id,
            "name":found.name,
            "email":found.email,
            "password":found.password,
            "credit_card":found.credit_card,
            "address_1":req.body.address_1,
            "address_2":req.body.address_2,
            "city":req.body.city,
            "region":req.body.region,
            "postal_code":req.body.postal_code,
            "country":req.body.country,
            "shipping_region_id":found.shipping_region_id,
            "day_phone":found.day_phone,
            "eve_phone":found.eve_phone,
            "mob_phone":found.mob_phone
           
        }).where('customer_id', found.customer_id)
        .then((data) =>{
            res.send({"Done": "data updated successfully!",data:data})
        }).catch((err) =>{
            res.send({'Msg': 'err check your data'})
        })       
    }else{
        res.json({error :true,message:"Email or password is wrong. data not found"})
        console.log('user did not found.You have to signup first.')
    }

}


//update the credit card from customer
exports.customer_creditcard=async(req,res)=>{
    const data=await knex('customer').select('*')
    var found = data.find(function(user){     
        if (user.customer_id==req.body.customer_id){ 
                return user   
            }})
    if (found){
        knex('customer').update({
            "customer_id":found.customer_id,
            "name":found.name,
            "email":found.email,
            "password":found.password,
            "credit_card":req.body.credit_card,
            "address_1":found.address_1,
            "address_2":found.address_2,
            "city":found.city,
            "region":found.region,
            "postal_code":found.postal_code,
            "country":found.country,
            "shipping_region_id":found.shipping_region_id,
            "day_phone":found.day_phone,
            "eve_phone":found.eve_phone,
            "mob_phone":found.mob_phone
        }).where('customer_id', found.customer_id)
        .then((data) =>{
            res.send({"Done": "data updated successfully!",data:data})
        }).catch((err) =>{
            res.send({'Msg': 'err check your data'})
        })       
    }else{
        res.json({error :true,message:"Email or password is wrong. data not found"})
        console.log('user did not found.You have to signup first.')
    }
}