const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        Name: { type: String },
        Time: { type: Number, required: true,  },
        category: {
            type: ObjectId, 
            ref: "Course",
             required: true
        },
        description:{
            type: String,
            required: true,
        }
    }, 
    { timestamps: true },
    
);
module.exports = mongoose.model("Quiz", productSchema);