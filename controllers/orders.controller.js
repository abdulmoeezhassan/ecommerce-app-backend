const Order = require("../schemas/orders.schema");

const orderController = {};

// Create Order
orderController.createOrder = async (req, res) => {
  try {
    const { userId, supplierId, cartId, totalAmount, } = req.body;

    if (!userId || !supplierId || !cartId || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      userId,
      supplierId,
      cartId,
      totalAmount,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Get All orders By Supplier ID 
orderController.getOrdersBySupplier = async (req, res) => {
    try {
    //   const supplierId = req.user._id; 
      const supplierId=req.params.id;
      const orders = await Order.find({ supplierId })
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this supplier" });
      }

      res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
module.exports = orderController;