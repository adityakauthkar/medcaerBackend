const express = require('express');
const router = express.Router();

const { addCategory, getAllCategories } = require('../controller/categoryController');

router.route('/addCategory').post(addCategory);
router.route('/categories').get(getAllCategories); 

module.exports = router;
