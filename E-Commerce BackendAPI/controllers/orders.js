const knex = require('knex')({
    client: "mysql",
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'Shubh@7171',
        database : 'Turing'
    }
})

exports.all_orders=(req,res)=>{
    console.log('hii')
    knex.select('*').from('orders')
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })

}

exports.orders=(req,res)=>{
    knex.select("*").from("shopping_cart").where("cart_id",req.body.cart_id)
    .join("product",function(){
        this.on('shopping_cart.product_id','product.product_id')
    })
    .then((data)=>{
        // console.log(data)
        // for (i of data){
            knex('orders').insert({
                "total_amount":data[0]['quantity']*data[0]['price'],
                "created_on":new Date,
                "customer_id":req.body.customer_id,
                "shipping_id":2,
                "tax_id":1
            }).then((data2)=>{
                    knex('order_detail').insert({
                        "item_id":req.body.item_id,
                        "order_id":data2[0],
                        "product_id":data[0].product_id,
                        "attributes":data[0].attributes,
                        "product_name":data[0].name,
                        "quantity":data[0].quantity,
                        "unit_cost":data[0].price
                    })
                    .then(()=>{

                        knex("shopping_cart").where("shopping_cart.cart_id",req.body.cart_id).del()
                        .then((data4)=>{
                            res.json({error:false,message:"data inserted","order_id":data2[0]})
                        })
                        .catch((err)=>{
                            res.send(err)
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.send(err)
                    })
            }).catch((err)=>{
                console.log(err)
                res.send(err)
            })    
    })
    .catch((err)=>{
        console.log(err)
    })
}

exports.orders_by_id=(req,res)=>{
    // console.log("hii")
    var order_id=req.params.order_id
    knex.select('orders.order_id','product.product_id','order_detail.attributes','product.name as product_name','order_detail.quantity','product.price','order_detail.unit_cost').from('orders')
    .join('order_detail', function() {
        this.on('orders.order_id','order_detail.order_id')
    }).join('product', function() {
        this.on('order_detail.product_id','product.product_id')
    }).where('orders.order_id',order_id)
    .then((data) =>{
        var final_list = [];
        for (i of data){
            i.subtotal = i.price * i.quantity
            final_list.push(i)
        }
        console.log(final_list)
        res.json({error:false,message:"data obtained 2",data:final_list})
    }).catch((err) =>{
        console.log(err);
    })


}



exports.orders_detail=(req,res)=>{
    knex.select('orders.order_id','orders.total_amount','orders.created_on','orders.shipped_on','orders.status','order_detail.product_name as name').from('orders')
    .join('order_detail', function() {
            this.on('orders.order_id','order_detail.order_id')
        })
        .where('orders.order_id', req.params.order_id)
        .then((data) =>{
            console.log(data);
            res.send(data)
        }).catch((err) =>{
            console.log(err);
        })
    


}