
const {registerValidation}=require('../validate')
const knex= require('knex')({
    client: 'mysql', 
    connection: {host : 'localhost',user : 'root',password : 'Shubh@7171',database : 'Project3'}
});

const verify=require('../verifytoken');


exports.post_blog=async(req,res)=>{
    // console.log(req.body)
    const id2=req.params.user_id
    const data=await knex.from('Register').select('*')
    // console.log(data)
    var found = data.find(function(user){ 
            if (user.user_id==id2){ 
                return user
            }
        })
        // console.log(found)
        if (found){
            knex('Posts').insert(
            {
                blog_title:req.body.blog_title,
                blog_post:req.body.blog_post,
                user_id:found.user_id
            })
            .then(()=>{
                console.log("Data inserted");
                res.json({error:false,message:"Data inserted..",data:req.body});

            })
            .catch((err)=>{
                console.log("Error while inserting data in table.")
            })
                
        }else{
            res.json({error:false,message:"Your id is not registered"});
        }

}


exports.read_blog=async(req,res)=>{
    const id2=req.params.user_id

    const data=await knex.from('Posts').select('*')
    // console.log(data)
    var found = data.find(function(user){ 
            if (user.user_id==id2){ 
                return user
            }
        })
    
    if (found){
            const data=await knex.from('Posts').select('*').where('user_id', id2)
            if(data){
                res.json({error:false,message:"Post data obtained",data:data});
                console.log(data)
            }
    }else{
        res.send("Your given id doesn't have any Post.")
    }        
}

exports.read_all=async(req,res)=>{
    const data=await knex.from('Posts').select('*')
    if(data){
        res.json({error:false,message:"Post data obtained",data:data});
        console.log(data)
    }
    else{
    res.send("No posts available.")
}
}