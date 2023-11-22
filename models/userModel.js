const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            require :[true, "username required..."]
        },
        password : {
            type: String,
            require : [true, "password required..."]
        }
        
    }
)
const User = mongoose.model("User",userSchema);
module.exports = User;
