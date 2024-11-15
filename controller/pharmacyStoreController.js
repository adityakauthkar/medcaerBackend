const PharmacyStore = require("../models/pharmacyStoreModel");
// const imageToBase64 = require('image-to-base64'); // Assuming this is an external function

// Post create pharmacy store
const create_store = async (req, res) => { 
    try {
        const { vendor_id, business_email, address, pin, location } = req.body; 
        // const base64Data = await imageToBase64(req.files.logo.path);

        const store = await PharmacyStore.create({
            vendor_id, 
            business_email, 
            address, 
            pin, 
            location,
            // logo: `data:${req.files.logo.type};base64,${base64Data}`,
            addedAt: Date.now()
        });

        if (store) { 
            res.status(202).json({
                success: true, 
                message: 'Store added successfully'
            });
        } else { 
            res.status(404).json({
                success: false, 
                message: 'Invalid store data entered'
            });
        }
    
    } catch (error) {
        res.status(400).send(error.message);
    }
};



//Find store near you 
const find_store = async (req, res) => { 
    try {
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;

        const store_data = await PharmacyStore.aggregate([
            {
                $geoNear: {
                    near: { 
                        type: "Point", 
                        coordinates: [parseFloat(longitude), parseFloat(latitude)] 
                    },
                    key: "location",
                    maxDistance: parseFloat(1000) * 1609, // 1000 miles in meters
                    distanceField: "dist.calculated",
                    spherical: true
                }
            }
        ]);

        res.status(200).json({
            success: true,
            msg: "Store details",
            data: store_data
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            msg: error.message
        });
    }
};


module.exports = { create_store , find_store };
