const cookie=require('cookies')
const {registerValidation}=require('../validate')
const knex= require('knex')({
    client: 'mysql', 
    connection: {host : 'localhost',
    user : 'root',
    password : 'Shubh@7171',
    database : 'Project3'}
});

const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const { use } = require('../routes/web');
TOKEN_SECRET="asdfghjklmnbvcx12345z"


exports.register=async(req,res)=>{   
    //validate data 
    const {error}= await registerValidation(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }else{
        const salt=await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(req.body.password,salt)  //hash passwords
        const data=await knex('Register').select('*')
        var found = data.find(function(user){     ////checking if the user is already in the database
                if (user.email==req.body.email){ 
                        return user   
                }})
        if (found){ res.json({error:false,message:"account already present using this email ",data:found});  
        }else{
            //create a new user
             knex('Register').insert({
                name:req.body.name,
                email:req.body.email,
                password:hashedPassword
            }).then(async()=>{     
                console.log("Data inserted")
                const data= await knex('Register').select('*')
                var found = data.find(function(user){ 
                    if (user.email==req.body.email){ 
                            return user   
                    }
                })
                if (found){
                    // const token=jwt.sign({id:found.id},"mynameisshubhangi");
                    // res.cookie('jwt',token,{expires:new Date(Date.now()+600000),httpOnly: true} )
                    token = jwt.sign({id:found.id},"iamshubhangi",{expiresIn:"6hr"})
                    // res.json({message:"Data inserted..","Youe id is": found.id})
                    res.cookie("user",token)
                    // console.log(token);
                    res.send("Data inserted..")
                    // console.log(res.cookie.jwt) 
                }})
            .catch((err)=>{
                console.log(err);
                res.json({error: err.details[0].message,data: req.body})
            })  
        }}
}

exports.login=async(req,res)=>{   
    const {error}= await registerValidation(req.body);
    if (error){
        console.log(error)
        return res.status(400).send(error.details[0].message);
    }else{ 
    const data=await knex('Register').select('*')
    var found = data.find(function(user){ 
            if (user.email==req.body.email){ 
                const validPass= bcrypt.compare(req.body.password,user.password)
                if(validPass){
                    return user
                }}
        })
        if (found){
            res.json({error:false,message:"login successfully..",data:found,Token:token})
        }else{
            res.json({
                error :true,
                message:"Email or password is wrong. data not found"
            })
            console.log('user did not found.')}
    }
}