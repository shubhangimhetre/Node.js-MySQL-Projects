const express = require("express");
const router=express.Router();
const serve=require('../controllers/department')
const serve2=require('../controllers/categories')
const serve3=require('../controllers/attributes')
const serve4=require('../controllers/products')
const serve5=require('../controllers/customers')
const serve6=require('../controllers/orders')
const serve7=require('../controllers/shoppingcart')
const serve8=require('../controllers/tax')
const serve9=require('../controllers/shipping')

const verify=require('../verify_token');


//Everything about Department
router.get('/department',serve.department);
router.get('/department/:department_id',serve.department_by_id);



//Everything about Categories
router.get('/categories',serve2.categories);
router.get('/categories/:category_id',serve2.categories_by_id);
router.get('/categories/inProduct/:product_id',serve2.categories_of_product);
router.get('/categories/inDepartment/:department_id',serve2.categories_of_department);



//Everything about Attributes
router.get('/attributes',serve3.attribute_list)
router.get('/attributes/:attribute_id',serve3.attribute_list_by_id)
router.get('/attributes/values/:attribute_value_id',serve3.attribute_values)
router.get('/attributes/inProduct/:product_id',serve3.attribute_with_productID)



//Everything about Products
router.get('/products',serve4.products)
router.get('/products/search',serve4.search_products)
router.get('/products/:product_id',serve4.products_by_id)
router.get('/products/inCategory/:category_id',serve4.products_of_categories)
router.get('/products/inDepartment/:department_id',serve4.productslist_on_department)
router.get('/products/:product_id/details',serve4.product_details)
router.get('/products/:product_id/locations',serve4.product_locations)
router.post('/products/:product_id/reviews',serve4.post_product_reviews)
router.get('/products/:product_id/reviews',verify,serve4.product_reviews)




// //Everything about Customers
router.put('/customer',verify,serve5.customer_update)
router.get('/customers/:customer_id',serve5.customer_by_id)
router.post('/customers',serve5.customer_register)
router.post('/customers/login',verify,serve5.customer_login)
// router.post('/customers/facebook',serve5.customer_login_facebook)
router.put('/customers/address',verify,serve5.customer_address)
router.put('/customers/creditcard',verify,serve5.customer_creditcard)


//Everything about Orders
router.post('/orders',verify,serve6.orders)
router.get('/orders/all_orders',verify,serve6.all_orders)
router.get('/orders/:order_id',verify,serve6.orders_by_id)
// router.get('/orders/orders_by_customer',verify,serve6.orders_by_customer)
router.get('/orders/order_detail/:order_id',verify,serve6.orders_detail)


// //Everything about Shopping Cart
router.get('/shoppingcart/generateUniqueId',serve7.generate_uniqueId)
router.post('/shoppingcart/add',serve7.add_product_toCart)
router.get('/shoppingcart/:cart_id',serve7.list_of_products)
router.put('/shoppingcart/update/:item_id',serve7.update_cart_byItem)
router.delete('/shoppingcart/delete/:cart_id',serve7.delete_cart)
router.get('/shoppingcart/totalAmount/:cart_id',serve7.total_amount)
// router.delete('/shoppingcart/removeProduct/:item_id',serve7.remove_product)




//****//Everything about Tax Department 
router.get('/taxes',serve8.tax)
router.get('/taxes/:tax_id',serve8.tax_by_id)



//*****//Everything about Shippings
router.get('/shipping/regions',serve9.shipping_regions)
router.get('/shipping/regions/:shipping_region_id',serve9.shipping_regions_by_id)

//Everything about Stripe Ingregation and Webhooks




module.exports=router
