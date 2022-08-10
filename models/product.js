const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        questionId: { type: String },
        questionText: { type: String, required: true },
        options: { type: Array, required: true },
        marks: { type: Number, required: false },
        difficultyLevel: { type: Number },
        questionType: { type: String, required: false },
        correctOptions: { type: Array, required: false },
        addedAt: { type: Date, default: Date.now },
        quiz: {
            type: ObjectId,  
            ref: "Quiz",
             required: true
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);