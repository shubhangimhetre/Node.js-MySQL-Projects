const knex = require('knex')({
    client: "mysql",
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'Shubh@7171',
        database : 'Turing'
    }
})
const { vary } = require('express/lib/response');
const generateUniqueId=require('generate-unique-id');
const { DATE } = require('mysql/lib/protocol/constants/types');


exports.generate_uniqueId=(req,res)=>{
    const id = generateUniqueId();
    res.send(id)
}


exports.add_product_toCart=async(req,res)=>{
    const data=await knex('shopping_cart').select('*')
        var found = data.find(function(user){     
            if (user.product_id==req.body.product_id){ 
                        return user   
            }
        })
        if (found){ 
            knex('shopping_cart').insert({
                "cart_id": found.cart_id,
                "attributes": found.attributes,
                "product_id": found.product_id,
                "quantity": found.quantity+1,
                "buy_now":found.buy_now,
                "added_on":new Date()               
            }).then(()=>{
                knex.select('shopping_cart.item_id','product.name','shopping_cart.attributes','shopping_cart.product_id','product.price','shopping_cart.quantity','product.image')
                .from('shopping_cart').join('product', function(){ this.on('product.product_id', 'shopping_cart.product_id')})
                .then((updatedata) => {
                    // console.log('data updated!')
                    console.log(updatedata)
                    var final_list = [];
                    for (i of updatedata){
                        i.subtotal = i.price*i.quantity
                        final_list.push(i);
                    }         
                    res.json({error:false,message:"data added",data:final_list})
                }).catch((err)=>{
                    res.send(err)
                })
            }).catch((err)=>{
                res.send('Error while inserting') 
                // res.send(err)
                // console.log(err)  
            })

        }else{
            knex('shopping_cart').insert({
                "cart_id": req.body.cart_id,
                "attributes": req.body.attributes,
                "product_id": req.body.product_id,
                "quantity": 1,
                "buy_now": 1,
                "added_on":new Date() 
            }).then((data)=>{
                knex.select('item_id','name','attributes','shopping_cart.product_id','price','quantity','image')
                .from('shopping_cart')
                .join('product',function(){this.on('shopping_cart.product_id','product.product_id')})
                .then((data) => {
                    var final_list = []
                    for ( i of data){
                        i.subtotal = i.price*i.quantity
                        final_list.push(i);
                    }
                    console.log(final_list)
                    res.json({error:false,message:"data added",data:final_list})
                }).catch((err)=>{
                    res.send(err)
                    console.log(err)
                })    
            }).catch((err)=>{
                res.send('Error while inserting')
                // res.send(err)
                // console.log(err)   
            })
        }
}

exports.list_of_products=(req,res)=>{
    var cart_id = req.params.cart_id;
    knex.select('shopping_cart.item_id','product.name','shopping_cart.attributes','shopping_cart.product_id','product.price','shopping_cart.quantity','product.image').from('shopping_cart')
    .join('product', function(){
        this.on('shopping_cart.product_id', 'product.product_id')
    }).where('shopping_cart.cart_id', cart_id)
    .then((data) =>{
        // console.log(data)
        var final_list = []
        for (i of data){
            i.subtotal = i.price*i.quantity;
            final_list.push(i);
        }
        // console.log(final_list);
        res.json({error:false,message:"data",data:final_list})
    }).catch((err)=>{
        console.log(err)
    });

}



exports.update_cart_byItem=(req,res)=>{
    var item_id = req.params.item_id;
    knex('shopping_cart').where('shopping_cart.item_id', item_id).update({'quantity': req.body.quantity})
    .then(() =>{
        knex.select('item_id','product.name','shopping_cart.attributes','shopping_cart.product_id','product.price','shopping_cart.quantity','product.image')
        .from('shopping_cart').where('shopping_cart.item_id', item_id)
        .join('product', function() {
            this.on('shopping_cart.product_id', 'product.product_id')
        })
        .then((data) =>{
            var final_list = [];
            for (i of data){
                i.subtotal = i.price * i.quantity;
                final_list.push(i);
            }
            console.log("data updated");
            res.json({error:false,message:"data",data:final_list})
        }).catch(err => console.log(err));
    }).catch((err) =>{
        console.log(err)
    })

}

exports.delete_cart=(req,res)=>{
    var cart_id = req.params.cart_id
    knex.select('*').from('shopping_cart').where('shopping_cart.cart_id', cart_id).del()
    .then((data) =>{
        console.log("data deleted")
        res.send({delete: 'data deleted successfully'})
    }).catch((err) => {
        console.log(err)
    });
}


exports.total_amount=(req,res)=>{
    var cart_id = req.params.cart_id;
    knex.select('price','quantity').from('shopping_cart')
    .join('product', function(){
        this.on('shopping_cart.product_id', 'product.product_id')
    }).where('shopping_cart.cart_id', cart_id)
    .then((data) =>{
        // console.log(data);
        for (i of data){
            var final_list = [];
            i.total_Amount =  i.quantity * i.price;
            final_list.push(i);
        }
        res.json({error:false,message:"data",data:final_list})
    }).catch((err) =>{
        console.log(err);
    })

}




