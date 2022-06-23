const knex = require('knex')({
    client: "mysql",
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'Shubh@7171',
        database : 'Turing'
    }
})


//Return shipping regions
exports.shipping_regions=(req,res)=>{
    knex.select('*').from('shipping_region')
        .then((data) =>{
            res.send(data);
        }).catch((err) =>{
            console.log(err);
        })
}


////Return shipping regions by id
exports.shipping_regions_by_id=(req,res)=>{
    var shipping_region_id = req.params.shipping_region_id;
        knex.select('*').from('shipping').where('shipping_region_id', shipping_region_id)
        .then((data) =>{
            res.send(data);
        }).catch((err) =>{
            console.log(err);
        })
}