const { compareSync } = require('bcryptjs');

const knex= require('knex')({
    client: 'mysql', 
    connection: {host : 'localhost',user : 'root',password : 'Shubh@7171',database : 'Project3'}
});



exports.post_like=async(req,res)=>{
    const id2=req.params.post_id
    // console.log(id2)
    const data=await knex.from('Posts').select('*')
    // console.log(data)
    var found = data.find(function(user){ 
            if (user.post_id==id2){ 
                return user
            }
        })
    // console.log(found)
    if (found){
        const data2=await knex.from('likes_dislikes').select('*')
        // console.log(data)
        var found2 = data2.find(function(user2){ 
                if (user2.post_id==req.params.post_id){ 
                    return user2
                }
            })        
        if (found2){

            likes=found2.post_like+1
                insert_data= {
                    post_id:req.params.post_id,
                    post_like:likes,
                    post_dislike:found2.dislike,
                }
                knex('likes_dislikes').where('post_id', req.params.post_id).update(insert_data)
                    .then(()=>{
                        console.log("Liked");
                        res.json({error:false,message:"You Liked the Post..","post_id":req.params.post_id});

                    })
                    .catch((err)=>{
                        console.log("Error while inserting data in table.")
                    })
        }else{
            insert_data= {post_id:req.params.post_id,
                post_like:1,
                post_dislike:0}
            knex('likes_dislikes').insert(insert_data)
                .then(()=>{
                    console.log("Liked");
                    res.json({error:false,message:"You Liked the Post..",post_id:req.params.post_id});})
                .catch((err)=>{
                    // console.log("Error while inserting data in table.")
                    throw err}
                    
                    )}
            
    }else{
        res.send("There is no post of given post_id.")
    }
     
} 

exports.post_dislike=async(req,res)=>{
    const id2=req.params.post_id
    // console.log(id2)
    const data=await knex.from('Posts').select('*')
    // console.log(data)
    var found = data.find(function(user){ 
            if (user.post_id==id2){ 
                return user
            }
        })
    // console.log(found)
    if (found){
        const data2=await knex.from('likes_dislikes').select('*')
        // console.log(data)
        var found2 = data2.find(function(user2){ 
                if (user2.post_id==req.params.post_id){ 
                    return user2
                }
            })        
        if (found2){

            dislikes=found2.post_dislike+1
                insert_data= {
                    post_id:req.params.post_id,
                    post_like:found2.post_like,
                    post_dislike:dislikes,
                }
                knex('likes_dislikes').where('post_id', req.params.post_id).update(insert_data)
                    .then(()=>{
                        console.log("Disliked");
                        res.json({error:false,message:"You disliked the Post..",post_id:req.params.post_id});

                    })
                    .catch((err)=>{
                        console.log("Error while inserting data in table.")
                    })
        }else{
            insert_data= {post_id:req.params.post_id,
                post_like:0,
                post_dislike:1}
            knex('likes_dislikes').insert(insert_data)
                .then(()=>{
                    console.log("Disliked");
                    res.json({error:false,message:"You Disliked the Post..",post_id:req.params.post_id});})
                .catch((err)=>{
                    // console.log("Error while inserting data in table.")
                    throw err}
                    
                    )}
            
    }else{
        res.send("There is no post of given post_id.")
    }
     

}







exports.read_likes=async(req,res)=>{
    const id2=req.params.post_id
    const data3=await knex.from('likes_dislikes').select('*')
    var found3= data3.find(function(user3){ 
        if (user3.post_id==req.params.post_id){ 
            return user3
            }
        })        
    if (found3){



        res.json({error:false,message:"likes and dislikes..",data:found3});


    }else{
        res.send("There is no post of given post_id.")
    }





}