
// const {get_data,post_data,get_id,put_data,delete_data}=require('../controllers/firstcontroller')
const express=require('express')
const router=express.Router()

const serve=require('../controllers/firstcontroller')

router.get('/get_data',serve.get_data)
router.get('/get_data/:id',serve.get_id)
router.post('/post_data',serve.post_data)
router.put('/put_data/:id',serve.put_data)
router.delete('/delete_data/:id',serve.delete_data)
// router.get("/:id",serve.get_byid)

module.exports=router