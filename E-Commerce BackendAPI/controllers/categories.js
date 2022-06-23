const { products } = require('./products');

const knex = require('knex')({
    client: "mysql",
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'Shubh@7171',
        database : 'Turing'
    }
})


exports.categories=(req,res)=>{
    // get categories data
    knex.select ('*').from ('category')
    .then((data) =>{
        console.log("categories data....");
        res.send(data);
    }).catch((err) =>{
        console.log(err);
        res.send(err);
    })
}

exports.categories_by_id=(req,res)=>{
    var category_id = req.params.category_id;
    knex.select ('*').from ('category').where ('category_id',category_id)
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
}


exports.categories_of_product=(req,res)=>{
    var product_id=req.params.product_id  
    knex.select('category.category_id','department_id','name').from('category').join('product_category',function(){
        this.on('category.category_id','product_category.category_id')
    })
    .where('product_category.product_id',product_id)
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
}


exports.categories_of_department=(req,res)=>{
    var department_id=req.params.department_id 
    knex.select('category_id','name','description','department_id').from('category').where('department_id', department_id)
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
}



