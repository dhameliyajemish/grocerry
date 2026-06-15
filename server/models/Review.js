import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
        user_id: {
            type: String,
            required: true
        },
        order_id: {
            type: String,
            required: true
        },
        product_id: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

// Ensure one review per product per order
reviewSchema.index({ order_id: 1, product_id: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema, "reviews");
export default Review;
