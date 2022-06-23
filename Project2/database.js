// const axios=require("axios")

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




const knex= require('knex')({
    client: 'mysql', 
    connection: {host : 'localhost',user : 'root',password : 'Shubh@7171',database : 'Project2'}
});
// knex.schema.createTable('KnexProject2', (table) => {
//     table.string('id');
//     table.string('name');
//     table.string('logo');
//     table.string('notes')
//     table.string('days_to_complete')
//     table.string('short_description');
//     table.string('type')
//     table.string('course_type')
//     table.string('lang_available');
//   })
//   .then((result) =>{console.log("Table Created.")} )
//   .catch((err)=>{console.log("Table exists");
// //   knex('Knexloginsignup').insert(data2).then(()=>{console.log("Data inserted")})
// //   .catch((err)=>{console.log("Error while inserting data in table.")})
//   })
// const fs=require('fs')

// buf=fs.readFileSync("Project_Request.json")
// data=JSON.parse(buf)
// // console.log(data)
// for (i of data){
//     data2=[i]
//     knex('KnexProject2').insert(data2).then(()=>{
//         // console.log("Data inserted")

//     })
//   .catch((err)=>{console.log("Error while inserting data in table.")})

// }




// var mysql=require("mysql")
// var k=require('readline-sync')
// var con=mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Shubh@7171",
//     database:"Project2"
// });

// con.connect(function(err) {
//     if (err){console.log('Not connected')
//     }else{
//     console.log("Connected!");}
//     var sql = "CREATE TABLE Request_Project2 (id varchar(400), name VARCHAR(400), logo VARCHAR(400), notes varchar(400), days_to_complete varchar(400), short_description varchar(400), type varchar(400), course_type varchar(400), lang_available varchar(400))";
//     con.query(sql, function (err, result) {
//     if (err){
//         console.log("Error while creating table.")
//     }else{
//     console.log("Table created");
//     }
//     });

// });

// const fs=require('fs')

// buf=fs.readFileSync("Project_Request.json")
// data=JSON.parse(buf)
// // console.log(data)
// for (i of data){
//     data2=[i]
//     knex('Request_Project2').insert(data2).then(()=>{
//         // console.log("Data inserted")

//     })
//   .catch((err)=>{console.log("Error while inserting data in table.")})

// }
