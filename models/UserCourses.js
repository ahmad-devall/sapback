const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId, 
            ref: "UserModel",
             required: true
        },
        courses:{
            type: Object,
            required: true,
        },
    }, 
    { timestamps: true }, 
    
);
module.exports = mongoose.model("UserCourse", productSchema);