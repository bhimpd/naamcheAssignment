const mongoose = require ("mongoose");
const productSchema = new mongoose.Schema(
    {
        productName :{
            type:"String",
            required : [true,"Product Name required..."]
        },
        category:{
            type:"String",
            required: [true,"Specify the category..."]
        },
        description:{
            type:"String",
            required:[true,"describe the product"]
        },
        price :{
            type:"String",
            required :[true, "enter the price"]
        }

    }
)

const products = mongoose.model("Product",productSchema);
module.exports = products