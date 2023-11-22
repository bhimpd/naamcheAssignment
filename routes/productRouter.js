const express = require("express");
const router = express.Router();

const{createProduct,getAllProducts,getSingleProduct,updateProduct,deleteProduct,searchProducts} = require("../controllers/productController")
router.route("/create").post(createProduct);
router.route("/allproducts").get(getAllProducts);

router.route("/singleproduct/:productId").get(getSingleProduct);
router.route("/update/:productId").put(updateProduct);
router.route("/delete/:productId").delete(deleteProduct);
router.route("/searchProduct").get(searchProducts);


module.exports = router;
