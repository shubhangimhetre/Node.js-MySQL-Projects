// const knex=require('../db.js')

const knex = require('knex')({
    client: "mysql",
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'Shubh@7171',
        database : 'Turing'
    }
})


exports.attribute_list=(req,res)=>{
        knex.select('*').from('attribute')
        .then((data) =>{
            res.send(data);
        }).catch((err) =>{
            console.log(err);
        })
}

exports.attribute_list_by_id=(req,res)=>{
    let attribute_id = req.params.attribute_id;
    knex.select('*').from('attribute').where('attribute_id',attribute_id)
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
}

exports.attribute_values=(req,res)=>{
    var attribute_value_id = req.params.attribute_value_id;
    knex.select('attribute_value_id','value').from('attribute_value').where('attribute_value_id', attribute_value_id)
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })

}

exports.attribute_with_productID=(req,res)=>{
    var product_id = req.params.product_id;
    knex.select('*').from('attribute').join('attribute_value',function () {
        this.on('attribute_value.attribute_id','attribute.attribute_id')
        
    }).join('product_attribute',function() {
        this.on('product_attribute.attribute_value_id','attribute_value.attribute_value_id')
    })
    .where('product_attribute.product_id',product_id)
    .then((data) =>{
        data_list=[]
        for (i of data){
            var d={
                "attribute_name":i.name,
                "attribute_value_id":i.attribute_value_id,
                "attribute_value":i.value
            }
            data_list.push(d)
        }
        res.send(data_list);
    }).catch((err) =>{
        console.log(err);
    })

}