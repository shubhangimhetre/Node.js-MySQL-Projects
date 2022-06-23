// const express= require('express');
const { error } = require('console');
const fs=require('fs')

buf=fs.readFileSync("Project_Request.json")
dataread=JSON.parse(buf)
// console.log(dataread)

// get data 
exports.get_data=(req,res)=>{
    res.send(dataread);
}

// get_data by id :ok
exports.get_id=(req,res)=>{
    console.log(req.params.id)  
    const id=req.params.id
    var found = dataread.find(function(user){ 
        if (user.id==id){ 
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
// post_data : ok
exports.post_data=(req,res)=>{
    console.log(req.body);
    new_data=req.body; 
    res.json({error:false,message:"data added successfully!",data:new_data});
    dataread.push(new_data)
    // fs.writeFile("Project_Request.json",JSON.stringify(dataread,null,4),())
    fs.writeFile("Project_Request.json", JSON.stringify(dataread,null,4), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("Data added successfully");
        }
    })

}

exports.put_data=(req,res)=>{
    console.log(req.params.id)
  
    objIndex = dataread.findIndex((obj => obj.id == req.params.id));
    dataread.splice(objIndex,1,req.body)
                    
    fs.writeFile("Project_Request.json", JSON.stringify(dataread,null,4), (err) => {
    if (err)
        console.log(err);
    else {
        console.log("Data added successfully");
        res.json({error:false,message:"data updated"});
        }
    })
}


//delete data : ok
exports.delete_data=(req,res)=>{
    console.log(req.params.id)
    buf=fs.readFileSync("Project_Request.json")
    dataread=JSON.parse(buf)
    for (i of dataread){
        for (j in i){
            // console.log(j)
            if (j=="id"){
                if (i[j]==req.params.id){
                    // console.log(i)
                    function arrayRemove(dataread, i) { 
    
                        return dataread.filter(function(ele){ 
                            return ele != i; 
                        });
                    }
                    var dataread = arrayRemove(dataread, i);
                    
                    fs.writeFile("Project_Request.json", JSON.stringify(dataread,null,4), (err) => {
                        if (err)
                          console.log(err);
                        else {
                          console.log("Data deleted successfully");
                          res.json({error:false,message:"data deleted"});
                        }
                    })
                }
            }
        }
    }    
}

