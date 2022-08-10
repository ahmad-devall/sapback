const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId, 
            ref: "UserModel",
             required: true
        },
        userQuizes:{
            type: Array,
            required: true,
        },
        quizInfo:{
            type:Object,
            required:false
        }
    }, 
    { timestamps: true }, 
    
);
module.exports = mongoose.model("UserQuiz", productSchema);