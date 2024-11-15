const Medicine = require('../models/medicineModel');
const ImageToBase64 = require('image-to-base64');

//Add Medicine
const addMedicine = async (req, res, next) => {
    try {
        const {
            name, description, category, manufacturer, price, stock,
            expirationDate, dosageForm, dosageStrength, instructions,
            sideEffects, interactions, createdAt, updatedAt , topSelling
        } = req.body;

        const base64Data = await ImageToBase64(req.files.medicineImage.path);

        const medicine = await Medicine.create({
            name,
            description,
            category,
            manufacturer,
            price,
            stock,
            expirationDate,
            dosageForm,
            dosageStrength,
            instructions,
            sideEffects,
            interactions,
            topSelling,
            createdAt,
            updatedAt,
            medicineImage: `data:${req.files.medicineImage.type};base64,${base64Data}`,
            addedAt: Date.now()
        });

        // Check if medicine was successfully added
        if (medicine) {
            res.status(201).json({
                success: true,
                msg: 'Medicine Added Successfully',
                data: medicine
            });
        } else {
            res.status(400).json({
                success: false,
                msg: 'Invalid medicine data'
            });
        }

    } catch (error) {
        console.error('Error adding medicine:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal error occurred',
        });
    }
}


//Get all medicines 
const getAllMedicines = async (req, res, next) => {
    try {
        const getAllMedicines = await Medicine.find();
        res.status(200).json(getAllMedicines);
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Medicine not fetched ',
        });
    }
};


//get top selling products only 
const getTopSellingMedicines = async (req, res) => {
    try {
        const results = await Medicine.find({ topSelling: true });

        if (results.length > 0) {
            res.status(200).json({
                success: true,
                data: results
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No top-selling medicines found'
            });
        }
    } catch (error) {
        console.error('Error retrieving top-selling medicines:', error);
        res.status(500).json({
            success: false,
            message: 'Error occurred while retrieving medicines',
            error: error.message
        });
    }
};



//Get medicine by its id 
const getMedicineById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find medicine by ID
        const medicine = await Medicine.findById(id);

        // Check if medicine exists
        if (!medicine) {
            return res.status(404).json({
                success: false,
                msg: 'Medicine not found'
            });
        }

        // Return medicine data
        res.status(200).json({
            success: true,
            data: medicine
        });

    } catch (error) {
        console.error('Error fetching medicine by ID:', error);
        res.status(500).json({
            success: false,
            msg: 'Internal error occurred'
        });
    }
};


//DELETE Medicine by its ID 
const deleteMedicineById = async (req, res, next) => {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);

        if (!medicine) {
            return res.status(404).json({
                success: false,
                msg: "Medicine not found in database",
            });
        }

        res.status(200).json({
            success: true,
            data: medicine,
            msg: "Medicine data deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Internal error occurred",
        });
    }
};

//Search Medicine 
const searchMedicine = async (req, res) => {
    try {
        const { query } = req.query;

        const results = await Medicine.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
            ]
        });


        if (results.length > 0) {
            res.status(200).json({
                success: true,
                data: results
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No medicine found matching the query'
            });
        }
    } catch (error) {
        console.error('Error searching medicine:', error); // Log the detailed error for debugging
        res.status(500).json({
            success: false,
            message: 'Error occurred while searching medicine',
            error: error.message
        });
    }
};


//get  Medicine by manufacturer  
const getMedicinesByManufacturer = async (req, res) => {
    try {
        const { manufacturer } = req.params;

        if (!manufacturer || manufacturer.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Manufacturer parameter is required'
            });
        }

        const results = await Medicine.find({ manufacturer: { $regex: new RegExp(manufacturer, 'i') } });

        if (results.length > 0) {
            res.status(200).json({
                success: true,
                data: results
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No medicines found for the specified manufacturer'
            });
        }
    } catch (error) {
        console.error('Error retrieving medicines by manufacturer:', error); // Log the detailed error for debugging
        res.status(500).json({
            success: false,
            message: 'Error occurred while retrieving medicines',
            error: error.message
        });
    }
};

//Get medicines according to category and categoryid 
const getMedicinesByCategory = async (req, res) => {
    try {
      const { categoryId } = req.params; // Get the categoryId from the request parameters
  
      // Find medicines by the category ID
      const medicines = await Medicine.find({ category: categoryId });
  
      if (!medicines || medicines.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No medicines found for this category.',
        });
      }
  
      res.status(200).json({
        success: true,
        data: medicines,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };
  

//GET medicine by medicine name : 
const getMedicineByName = async (req, res) => {


    try {
        const medicineName = req.params.name;
        const medicine = await Medicine.findOne({ name: medicineName });

        if (!medicine) {
            res.status(404).json({
                success: false,
                msg: "Medicine name is not found in database "
            })
        }
        res.status(200).json({
            success: true,
            medicine
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error occured "
        })
    }



}

module.exports = { addMedicine, getAllMedicines, getMedicineById, deleteMedicineById, searchMedicine, getMedicinesByManufacturer, getMedicinesByCategory, getMedicineByName , getTopSellingMedicines};

