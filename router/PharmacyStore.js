const express = require('express');
const router = express.Router();

const { create_store , find_store } = require('../controller/pharmacyStoreController');

router.route('/addStore').post(create_store);
router.route('/findStore').post(find_store);

module.exports = router;
