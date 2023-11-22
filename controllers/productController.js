const Product = require("../models/productModel");
const {loginSession} = require("../middleware/loginSession");

exports.createProduct = async (req, res) => {
  try {
    const { productName, category, description, price } = req.body;
    if (!productName || !category || !description || !price) {
      return res.status(400).json({ message: "all fields are required.." });
    }
    loginSession(req, res, async () => {
      const product = await Product.create({
        productName,
        category,
        description,
        price,
      });

      return res.status(200).json({ message: "product added", product });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



exports.getAllProducts = async (req, res) => {
  try {
    loginSession(req, res, async () => {
      const { page = 1, pageSize = 5 } = req.query;

      const count = await Product.countDocuments();
      const products = await Product.find()
        .skip((page - 1) * pageSize)
        .limit(parseInt(pageSize));

      return res.status(200).json({
        products,
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / pageSize),
      });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
  
  exports.getSingleProduct = async (req, res) => {
    try {
      loginSession(req, res, async () => {
        const productId = req.params.productId;
        console.log("Requested Product ID:", productId);
  
        const product = await Product.findById(productId);
  
        if (!product) {
          console.log("Product not found");
          return res.status(404).json({ message: "Product not found" });
        }
  
        console.log("Product found:", product);
        return res.status(200).json({ product });
      });
    } catch (error) {
    //   console.error("Error:", error);
      return res.status(500).json({ error: error.message });
    }
  };
  
  
  exports.updateProduct = async (req, res) => {
    try {
      loginSession(req, res, async () => {
        const productId = req.params.productId;
        const { productName, category, description, price } = req.body;
  
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          { productName, category, description, price },
          { new: true, runValidators: true }
        );
  
        if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
  
        return res.status(200).json({ message: "Product updated", product: updatedProduct });
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  exports.deleteProduct = async (req, res) => {
    try {
      loginSession(req, res, async () => {
        const productId = req.params.productId;
  
        const deletedProduct = await Product.findByIdAndDelete(productId);
  
        if (!deletedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
  
        return res.status(200).json({ message: "Product deleted", product: deletedProduct });
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  exports.searchProducts = async (req, res) => {
    try {
      loginSession(req, res, async () => {
        const { page = 1, pageSize = 5, search = "" } = req.query;
  
        const regex = new RegExp(search, "i");
  
        const query = {
          productName: { $regex: regex },
        };
  
        const count = await Product.countDocuments(query);
        const products = await Product.find(query)
          .skip((page - 1) * pageSize)
          .limit(parseInt(pageSize));
  
        return res.status(200).json({
          products,
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / pageSize),
        });
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };