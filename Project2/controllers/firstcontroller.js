const knex= require('knex')({
    client: 'mysql', 
    connection: {host : 'localhost',user : 'root',password : 'Shubh@7171',database : 'Project2'}
});


exports.get_data=async(req,res)=>{
    var all_data=await knex
    .from('KnexProject2')
    // .select('id', 'name', 'logo','notes','days_to_complete',"short_description","type","course_type","lang_available")
    .select('*')
    res.send(all_data)
}

exports.get_data_id=async(req,res)=>{
    const id2=req.params.id
    console.log(id2)    
    const data=await knex.from('KnexProject2').select('*')
    console.log(data)
    var found = data.find(function(user){ 
            if (user.id==id2){ 
                return user
            }
        })
        console.log(found)
        if (found){
            res.json({error:false,message:"data present",data:found});
        }else{
            res.json({
                error :true,
                message:"data not found"
            })
            console.log('user did not found.')
        }
    
}


exports.post_data=async(req,res)=>{
    console.log(req.body)
    const data=await knex.from('KnexProject2').select('*')
    // console.log(data)
    var found = data.find(function(user){ 
            if (user.id==req.body.id){ 
                // console.log(req.body.id)
                return user
            }
        })
        // console.log(found)
        if (found){
            res.json({error:false,message:"data already present",data:found});
        }else{
            knex('KnexProject2').insert(req.body)
            .then(()=>{console.log("Data inserted");
            res.json({error:false,message:"Data inserted..",data:req.body});
        })
        .catch((err)=>{console.log("Error while inserting data in table.")})

        }
}

exports.put_data=async(req,res)=>{
    // console.log(req.body)
    const id2=req.params.id
    // console.log(id2)
    const data=await knex.from('KnexProject2').select('*')
    // console.log(data)
    var found = data.find(function(user){ 
        if (user.id==id2){ 
            return user
        }
    })
    // console.log(found)
    if (found){
        // res.json({error:false,message:"data present",data:found});
        await knex('KnexProject2')
        .where('id', req.body.id)
        .update(req.body)
        res.json({error:false,message:"Data updated..",data:req.body});
        
    }else{
        res.json({
            error :true,
            message:"data not found"
        })
        console.log('user did not found.')
    }


}



exports.delete_data=async(req,res)=>{
    const id2=req.params.id
    console.log(id2)    
    const data=await knex.from('KnexProject2').select('*')
    // console.log(data)
    var found = data.find(function(user){ 
            if (user.id==id2){ 
                return user
            }
        })
        // console.log(found)
        if (found){
            await knex('KnexProject2').select('*').where('id',id2).del()
            
            res.json({error:false,message:"data deleted",data:found});
        }else{
            res.json({
                error :true,
                message:"data not found"
            })
            console.log('user did not found.')
        }
    
}


// module.exports={get_data,get_data_id}

