const knex = require('knex')({
    client: "mysql",
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'Shubh@7171',
        database : 'Turing'
    }
})


//get all taxes
exports.tax=(req,res)=>{
    knex.select('*').from('tax')
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
}


//get tax by id
exports.tax_by_id=(req,res)=>{
    var tax_id = req.params.tax_id;
    knex.select('*').from('tax').where('tax_id', tax_id)
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
}