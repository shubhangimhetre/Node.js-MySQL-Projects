// Turing ECommerce API 

const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken")
//parse requests of content-type application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:true}))
const port=3000
const cookieParser=require('cookie-parser')
app.use(cookieParser());
app.use(express.json())

const web=require('./routes/web')
var knex = require('knex')({
    client: "mysql",
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'Shubh@7171',
        database : 'Turing'
    }
})



app.use('/',web)



// the port listener
var server = app.listen(3000, function(){
    console.log(`server listening at port ${port}`)
  });
