
const express=require('express');
const app=express();
const bodyparser=require('body-parser');
//parse requests of content-type application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:true}))
//parse requests of content-type-application/json
app.use(bodyparser.json())
port=3000;

const web=require('./routes/web')

app.use('/',web)




app.listen(port,()=>{
    console.log(`server listening at port ${port}`)
})




