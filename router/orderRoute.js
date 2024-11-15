const express = require('express');
const router = express.Router(); 

const {createOrder} = require('../controller/orderController');

router.route('/createOrder').post(createOrder);


module.exports = router;