const express = require('express');
const router = express.Router();


const {addToCart , removeFromCart , viewCart} = require('../controller/cartController');

router.route('/addToCart').post(addToCart);
router.route('/cart/:userId/:medicineId').delete(removeFromCart);
router.route('/cart/:userId').get(viewCart);
module.exports = router;