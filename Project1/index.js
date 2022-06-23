const axios=require("axios")

// const fs=require("fs")
// const input=require("readline-sync")
// async function makeGetRequest() {
//    let res=await axios.get("https://api.merakilearn.org/courses")
//     let data = res.data;
//     // console.log(data);
//     fs.writeFileSync("Project_Request.json",JSON.stringify(data,null,4))

//     return data
// }
// data=makeGetRequest();
// console.log(data)



const express=require('express');
// const req = require("express/lib/request");
// const { post_data, put_data, delete_data } = require("./controllers/firstcontroller");

const app=express();
const bodyparser=require('body-parser')

//parse requests of content-type application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:true}))

//parse requests of content-type-application/json
app.use(bodyparser.json())

port=3000;

// const get_data=require('./routes/web')

// app.get('/',(req,res)=>{
//     res.send('Welcome to Meraki API.')
// })
// app.use('/',get_data)

// app.use('/',post_data)
// app.use('/',put_data)
// app.use('/',delete_data)

const route=require('../Project1/routes/web')
app.use('/',route)



app.listen(port,()=>{
    console.log(`server listening at port ${port}`)
})