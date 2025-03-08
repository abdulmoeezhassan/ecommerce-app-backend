const Cart=require("../schemas/cart.schema")

// Save Cart
const saveCartController= async (req, res) => {
  try {
    const { products, userId, supplierId, totalAmount } = req.body;

    if (!products || !userId || !supplierId || !totalAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newCart = new Cart({
      products,
      userId,
      supplierId,
      totalAmount,
    });
    
    const savedCart = await newCart.save();

    res.status(201).json({ message: "Cart saved successfully", cart: savedCart });
  } catch (error) {
    console.error("Error saving cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {saveCartController};