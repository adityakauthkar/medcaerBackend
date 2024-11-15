const Category = require('../models/categoryModel');
const ImageToBase64 = require('image-to-base64');



const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const base64Data = await ImageToBase64(req.files.categoryImage.path);

        const category = await Category.create({
            name,
            categoryImage: `data:${req.files.categoryImage.type};base64,${base64Data}`,
        })

        if (category) {
            res.status(202).json({
                success: true,
                msg: "Category added successfully",
                data: category
            })
        } else {
            res.status(404).json({
                success: false,
                msg: "Invalid category data added ",
            })
        }

    } catch (error) {
        console.error('Error adding medicine:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal error occurred',
        })
    };
}


const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            msg: 'Categories fetched successfully',
            data: categories
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal error occurred while fetching categories',
        });
    }
};



module.exports = { addCategory, getAllCategories }; 