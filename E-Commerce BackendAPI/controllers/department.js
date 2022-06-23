

const knex = require('knex')({
    client: "mysql",
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'Shubh@7171',
        database : 'Turing'
    }
})
exports.department=(req,res)=>{
    knex.select ('*').from ('department')
    .then((data) =>{
        console.log("done");
        res.send(data)
    }).catch((err) =>{
        console.log(err);
    })
}

exports.department_by_id=(req,res)=>{
    var department_id = req.params.department_id;
    knex.select ('*').from ('department').where ('department_id',department_id)
    .then((data) =>{
        console.log("done");
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
}




