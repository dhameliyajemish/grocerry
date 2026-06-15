import Review from "../models/Review.js";
import Order from "../model/Orders.js";
import Product from "../model/Products.js";

/* =========================
   CREATE REVIEW
========================= */
export const createReview = async (req, res) => {
    try {
        console.log("Review Route Loaded");
        console.log("Review route hit");
        console.log(req.body);
        console.log(req.params);
        
        const { order_id, product_id, rating, comment } = req.body;
        const user_id = req.user?.id;

        if (!user_id) return res.status(401).json({ message: "Unauthorized" });

        // 1. Verify Order exists, belongs to user, and is DELIVERED
        const order = await Order.findOne({ order_id, user_id });
        if (!order) return res.status(404).json({ message: "Order not found or unauthorized" });
        if (order.status !== 'DELIVERED') return res.status(400).json({ message: "Can only review delivered orders." });

        // 2. Verify Product is in the order
        const productInOrder = order.products.find(p => (p.product_id || p.id) === product_id);
        if (!productInOrder) return res.status(400).json({ message: "Product not found in this order." });

        // 3. Ensure no duplicate review
        const existingReview = await Review.findOne({ order_id, product_id });
        if (existingReview) return res.status(400).json({ message: "You have already reviewed this product for this order." });

        // 4. Create and save review
        const review = new Review({
            user_id,
            order_id,
            product_id,
            rating: Number(rating),
            comment
        });
        await review.save();

        // 5. Update Product averageRating and reviewCount
        const productReviews = await Review.find({ product_id });
        const reviewCount = productReviews.length;
        const averageRating = productReviews.reduce((acc, item) => item.rating + acc, 0) / reviewCount;

        await Product.findOneAndUpdate(
            { id: product_id },
            { averageRating: averageRating.toFixed(1), reviewCount },
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
        const reviews = await Review.find({ product_id: productId }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
