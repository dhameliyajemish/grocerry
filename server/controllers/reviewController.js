import mongoose from "mongoose";
import Review from "../models/Review.js";
import Order from "../model/Orders.js";
import Product from "../model/Products.js";
import User from "../model/Users.js";

/* =========================
   CHECK REVIEW ELIGIBILITY
========================= */
export const checkReviewEligibility = async (req, res) => {
    try {
        const { productId } = req.params;
        const user_id = req.user?.id;
        if (!user_id) return res.status(401).json({ message: "Unauthorized" });

        const deliveredOrders = await Order.find({ user_id, status: 'DELIVERED' });
        let isEligible = false;

        for (let o of deliveredOrders) {
            if (o.products.some(p => (p.product_id || p.id) === productId)) {
                isEligible = true;
                break;
            }
        }

        res.status(200).json({ eligible: isEligible });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =========================
   CREATE REVIEW
========================= */
export const createReview = async (req, res) => {
    try {
        console.log("Review Route Loaded");
        console.log("Review route hit");
        console.log(req.body);
        console.log(req.params);
        
        const { product_id, rating, comment } = req.body;
        let { order_id } = req.body;
        const user_id = req.user?.id;

        if (!user_id) return res.status(401).json({ message: "Unauthorized" });

        // If order_id is missing (e.g. from Product Details page), find a delivered order
        if (!order_id) {
            const deliveredOrders = await Order.find({ user_id, status: 'DELIVERED' });
            for (let o of deliveredOrders) {
                if (o.products.some(p => (p.product_id || p.id) === product_id)) {
                    order_id = o.order_id;
                    break;
                }
            }
            if (!order_id) {
                return res.status(403).json({ message: "You must purchase and receive this product before you can write a review." });
            }
        }

        // 1. Verify Order exists
        const order = await Order.findOne({ order_id, user_id });
        if (!order) return res.status(404).json({ message: "Order not found or unauthorized" });
        if (order.status !== 'DELIVERED') return res.status(400).json({ message: "Can only review delivered orders." });

        // 2. Verify Product is in the order
        const productInOrder = order.products.find(p => (p.product_id || p.id) === product_id);
        if (!productInOrder) return res.status(400).json({ message: "Product not found in this order." });

        // 3. Ensure no duplicate review
        const existingReview = await Review.findOne({ order_id, product_id });
        if (existingReview) return res.status(400).json({ message: "You have already reviewed this product." });

        // 4. Create and save review
        const review = new Review({
            user_id,
            order_id,
            product_id,
            rating: Number(rating),
            comment
        });
        await review.save();

        // 5. Update Product rating and numReviews
        const productReviews = await Review.find({ product_id });
        const numReviews = productReviews.length;
        
        // Safely calculate new rating, handling potential non-numeric values in old data
        let totalRating = 0;
        productReviews.forEach(item => {
            totalRating += (Number(item.rating) || 0);
        });
        const newRating = numReviews > 0 ? (totalRating / numReviews) : 0;

        await Product.findOneAndUpdate(
            { $or: [
                { id: String(product_id) }, 
                { product_id: String(product_id) },
                ...(mongoose.Types.ObjectId.isValid(product_id) ? [{ _id: product_id }] : [])
            ] },
            { $set: { rating: Number(newRating.toFixed(1)), numReviews } },
            { new: true }
        );

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =========================
   GET ORDER REVIEWS
========================= */
export const getReviewsByOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const user_id = req.user?.id;
        if (!user_id) return res.status(401).json({ message: "Unauthorized" });

        const reviews = await Review.find({ order_id: orderId, user_id });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =========================
   GET PRODUCT REVIEWS
========================= */
export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ product_id: productId }).lean().sort({ createdAt: -1 });
        
        // Fetch user details for each review since user_id is a string
        const populatedReviews = await Promise.all(reviews.map(async (review) => {
            let user = null;
            try {
                if (review.user_id) {
                    user = await User.findById(review.user_id).select('first_name last_name email');
                }
            } catch (err) {
                console.warn(`Could not find user for review ${review._id}`);
            }
            return {
                ...review,
                user: user || { first_name: 'Anonymous', last_name: 'User' }
            };
        }));
        
        res.status(200).json(populatedReviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
