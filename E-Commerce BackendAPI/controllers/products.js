const { log } = require('console');
const jwt=require('jsonwebtoken');
const cookies=require('cookies')


const knex = require('knex')({
    client: "mysql",
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'Shubh@7171',
        database : 'Turing'
    }
})

exports.products=(req,res)=>{
    knex.select('*').from('orders')
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
}


exports.search_products=(req,res)=>{
    var search=req.query.search
    knex.select('product.product_id','name','description','price','discounted_price','thumbnail').from('product')
    .whereLike("name","%search%")
    .orWhere("product_id","%search%")
    .orWhere("description","%search%")
    .orWhere("price","%search%")
    .orWhere("discounted_price","%search%")
    .then((data) =>{
        // console.log(data)
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })

}


exports.products_by_id=(req,res)=>{
    var product_id = req.params.product_id;
    knex.select('*').from('product').where('product_id', product_id)
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
}


exports.products_of_categories=(req,res)=>{
    d={}
    var category_id=req.params.category_id
    knex.select('product.product_id','name','description','price','discounted_price','thumbnail').from('product').join('product_category',function(){
        this.on('product.product_id','product_category.product_id')
    }).where('product.product_id',category_id)
    .then((data) =>{
        d["count"]=data.length;
        d["rows"]=data;
        res.send(d);
    }).catch((err) =>{
        console.log(err);
    })
}


exports.productslist_on_department=(req,res)=>{
    var department_id=req.params.department_id 
    knex.select('product.product_id','product.name','product.description','product.price','product.discounted_price','product.thumbnail').from('product')
    .join('product_category',function(){
        this.on('product.product_id','product_category.product_id')
    }).join('category',function(){
        this.on('product_category.category_id','category.category_id')
    }).join('department',function(){
        this.on('category.department_id','department.department_id')
    })
    .where('department.department_id', department_id)
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
}


exports.product_details=(req,res)=>{
    var product_id = req.params.product_id;
    knex.select('product_id','name','description','price','discounted_price','image','image_2').from('product')
    .where('product.product_id',product_id)
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
}


exports.product_locations=(req,res)=>{
    var product_id = req.params.product_id;
    knex.select('category.category_id','category.name as category_name','category.department_id','department.name as department_name')
    .from('product')
    .join('product_category', function(){
        this.on('product.product_id','product_category.product_id')
    }).join('category', function(){
        this.on('product_category.category_id','category.category_id')
    }).join('department', function(){
        this.on('category.department_id','department.department_id')
    }).where('product.product_id', product_id)
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
}

exports.product_reviews=(req,res)=>{
    var product_id=req.params.product_id
    knex.select('*').from('review').where('product_id',product_id)
    .then((data)=>{
        res.json({error:false,message:"Review obtained",data:data})
    })
    .catch((err)=>{
        res.send(err)
    })

}

exports.post_product_reviews=(req,res)=>{
    knex('review').insert({
        "customer_id":req.body.customer_id,
        "product_id":req.body.product_id,
        "review":req.body.review,
        "rating":req.body.rating,
        "created_on": new Date()
    })
    .then((data)=>{
        res.json({error:false,message:"Review added."})
    })
    .catch((err)=>{
        res.send("Error while inserting..")
    })            
            
}
