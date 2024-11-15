// Importing necessary modules
const express = require('express');
const router = express.Router();

// Importing the addMedicine function from the medicineRouter file
const { addMedicine , getAllMedicines, getMedicineById, deleteMedicineById, searchMedicine, getMedicinesByManufacturer , getMedicinesByCategory , getMedicineByName , getTopSellingMedicines } = require('../controller/medicineController'); 

// Defining a POST route for adding medicine
router.route('/addMedicine').post(addMedicine); 
router.route('/getAllMedicines').get(getAllMedicines); 
router.route('/getMedicineById/:id').get(getMedicineById);
router.route('/deleteMedicineById/:id').delete(deleteMedicineById); 
router.route('/searchMedicine').get(searchMedicine); 
router.route('/manufacturer/:manufacturer').get(getMedicinesByManufacturer); 
router.route('/getMedicinesByCategory/:category').get(getMedicinesByCategory);
router.route('/getMedicineByName/:name').get(getMedicineByName); 
router.route('/top-selling').get(getTopSellingMedicines);
router.route('/medicines/category/:categoryId').get(getMedicinesByCategory);





module.exports = router;
