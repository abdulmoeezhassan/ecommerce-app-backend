const Products = require("../schemas/products.schema");
const { default: mongoose } = require("mongoose");

let productsController = {};

productsController.createProduct = async (req, res) => {
  try {
    const body = req.body;
    if (req.files) {
      body.images = req?.files?.map(file => file.path);
  }
    const createProduct = await Products.create(body);
    if (!createProduct) {
      return res.status(400).json({ message: "Error in creating product" });
    }

    res.status(201).json({ message: "Product created successfully", product: createProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

productsController.getAllProducts = async (req, res) => {
  try {
    const getAllProducts = await Products.find({});
    if (!getAllProducts.length) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ message: "Products fetched successfully", products: getAllProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

productsController.getProductsBySupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const getAllProductsBySupplier = await Products.find({ supplierId: new mongoose.Types.ObjectId(supplierId) });
    if (!getAllProductsBySupplier.length) {
      return res.status(404).json({ message: "No products found for this supplier" });
    }

    res.status(200).json({ message: "Products fetched successfully", products: getAllProductsBySupplier });
  } catch (error) {
    console.error("Error fetching products by supplier:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = productsController;
