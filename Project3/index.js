const express=require('express');
const app=express();
const bodyparser=require('body-parser');
//parse requests of content-type application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:true}))
//parse requests of content-type-application/json
app.use(bodyparser.json())
const cookieParser=require('cookie-parser')
port=3000;
app.use(cookieParser());
const web=require('./routes/web')

app.get('/',(req,res)=>{
    res.send('Hii')
})
app.use('/api',web)


//routes
//"localhost:3000/api/user/register"

app.listen(port,()=>{
    console.log(`server listening at port ${port}`)
})