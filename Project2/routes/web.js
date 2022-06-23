const express=require('express');
const router=express.Router();
const serve=require('../controllers/firstcontroller')


router.get('/get_data',serve.get_data)
router.get('/get_data_id/:id',serve.get_data_id)
router.post('/post_data',serve.post_data)
router.put('/put_data/:id',serve.put_data)
router.delete('/delete_data/:id',serve.delete_data)

module.exports=router
