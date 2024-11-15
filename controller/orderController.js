const Order = require('../models/orderModel');
const Medicine = require('../models/medicineModel');

// POST create order
const createOrder = async (req, res) => {
  try {
    const { 
      shippingInfo, 
      orderItems, 
      paymentInfo, 
      taxPrice, 
      shippingPrice, 
      totalPrice, 
      userId , 
      medicineId 
    } = req.body;

    // Validate request body
    if (!shippingInfo || !orderItems || !paymentInfo || !taxPrice || !shippingPrice || !totalPrice || !userId ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    
    // Calculate total price of items
    let calculatedItemsPrice = 0;
    for (let item of orderItems) {
      const medicine = await Medicine.findById(item.medicine);
      if (!medicine) {
        return res.status(404).json({ message: `Medicine with ID ${item.medicine} not found` });
      }
      
      // Calculate total item price
      calculatedItemsPrice += medicine.price * item.quantity;
    }

    // Calculate total price (itemsPrice + taxPrice + shippingPrice)
    const calculatedTotalPrice = calculatedItemsPrice + taxPrice + shippingPrice;

    // Ensure the calculated total price matches the provided totalPrice
    if (calculatedTotalPrice !== totalPrice) {
      return res.status(400).json({ 
        message: "Total price mismatch", 
        calculatedTotalPrice: calculatedTotalPrice 
      });
    }

    // Create a new order
    const newOrder = new Order({
      shippingInfo: shippingInfo,
      orderItems: orderItems,
      user: userId,
      paymentInfo: paymentInfo,
      itemsPrice: calculatedItemsPrice,
      taxPrice: taxPrice,
      shippingPrice: shippingPrice,
      totalPrice: calculatedTotalPrice,
      paidAt: Date.now(),
      orderStatus: 'Processing',  // Default order status
    });

    // Save the order in the database
    const savedOrder = await newOrder.save();
    return res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });

  } catch (error) {
    console.error("Error in creating order:", error);
    return res.status(500).json({
      success: false,
      message: "Error in creating order",
      error: error.message,
    });
  }
};

module.exports = { createOrder };
