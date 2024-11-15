// controllers/cartController.js
const Cart = require('../models/cartModel');
const Medicine = require('../models/medicineModel');

// Add to Cart
const addToCart = async (req, res) => {
    try {
        const { userId, medicineId, quantity } = req.body;

        // Check if the medicine exists
        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        // Find the user's cart or create a new one
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if the medicine is already in the cart
        const itemIndex = cart.items.findIndex(item => item.medicineId.toString() === medicineId);

        if (itemIndex > -1) {
            // If the medicine is already in the cart, update the quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // If the medicine is not in the cart, add it
            cart.items.push({ medicineId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Medicine added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};





// Remove from Cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, medicineId } = req.params;

        // Find the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Check if the medicine is in the cart
        const itemIndex = cart.items.findIndex(item => item.medicineId.toString() === medicineId);

        if (itemIndex > -1) {
            // Remove the medicine from the cart
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return res.status(200).json({ message: "Medicine removed from cart", cart });
        } else {
            return res.status(404).json({ message: "Medicine not found in cart" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};





// View Cart
const viewCart = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate('items.medicineId');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};






module.exports = { addToCart , removeFromCart , viewCart};
