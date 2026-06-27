import mongoose from 'mongoose';
import Products from '../../model/Products.js';
import Order from '../../model/Orders.js';
import Shipments from '../../model/Shipments.js';
import Users from '../../model/Users.js';
import Review from '../../models/Review.js';

/**
 * Admin Dashboard - Get Statistics
 */
export const getDashboardStats = async (req, res) => {
    try {
        // Get counts
        const totalProducts = await Products.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalShipments = await Shipments.countDocuments();
        const totalUsers = await Users.countDocuments();

        // Get revenue from non-cancelled orders
        const validOrders = await Order.find({ status: { $ne: 'CANCELLED' } });
        const totalRevenue = validOrders.reduce((sum, order) => sum + (order.total || 0), 0);

        // Get recent orders (last 5)
        const recentOrders = await Order.find()
            .sort({ ordered_at: -1 })
            .limit(5)
            .select('order_id total status ordered_at');

        // Get orders by status
        const ordersByStatus = await Order.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        // Get low stock products (less than 10 items)
        const lowStockProducts = await Products.find({
            $expr: { $lt: ['$stock', 10] }
        })
            .limit(10)
            .select('id name stock');

        // Get monthly sales for the last 12 months
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
        
        const monthlySales = await Order.aggregate([
            {
                $match: {
                    ordered_at: { $gte: twelveMonthsAgo },
                    status: { $ne: 'CANCELLED' }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$ordered_at' },
                        month: { $month: '$ordered_at' }
                    },
                    totalSales: { $sum: '$total' }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        res.status(200).json({
            stats: {
                totalProducts,
                totalOrders,
                totalShipments,
                totalUsers,
                totalRevenue: totalRevenue.toFixed(2),
            },
            recentOrders,
            ordersByStatus,
            lowStockProducts,
            monthlySales
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Admin - Get All Users
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find()
            .select('-password -otp -otpExpires')
            .sort({ _id: -1 });

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Admin - Update User Role
 */
export const updateUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;

        if (!['USER', 'ADMIN'].includes(role)) {
            return res.status(400).json({ message: "Invalid role. Must be USER or ADMIN" });
        }

        const user = await Users.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        ).select('-password -otp -otpExpires');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Admin - Delete User
 */
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await Users.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Admin - Delete Product
 */
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Products.findOneAndDelete({ id: productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Admin - Get Single Product
 */
export const getProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Products.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Admin - Update Product
 */
export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const updateData = req.body;

        const product = await Products.findOneAndUpdate(
            { id: productId },
            updateData,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Admin - Get All Reviews
 */
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().lean().sort({ createdAt: -1 });

        const populatedReviews = await Promise.all(reviews.map(async (review) => {
            let user = null;
            let product = null;

            try {
                if (review.user_id) {
                    user = await Users.findById(review.user_id).select('first_name last_name email');
                }
            } catch (err) {
                console.warn(`Could not find user for review ${review._id}`);
            }

            try {
                if (review.product_id) {
                    product = await Products.findOne({
                        $or: [
                            { id: String(review.product_id) },
                            { product_id: String(review.product_id) }
                        ]
                    }).select('name image pricing');
                }
            } catch (err) {
                console.warn(`Could not find product for review ${review._id}`);
            }

            return {
                ...review,
                user: user || { first_name: 'Anonymous', last_name: 'User', email: 'N/A' },
                product: product || { name: 'Unknown Product', image: '', pricing: { selling_price: 0 } }
            };
        }));

        res.status(200).json({ reviews: populatedReviews });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Admin - Delete Review
 */
export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findByIdAndDelete(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Recalculate product rating/reviews count
        const product_id = review.product_id;
        const productReviews = await Review.find({ product_id });
        const numReviews = productReviews.length;
        
        let totalRating = 0;
        productReviews.forEach(item => {
            totalRating += (Number(item.rating) || 0);
        });
        const newRating = numReviews > 0 ? (totalRating / numReviews) : 0;

        await Products.findOneAndUpdate(
            { $or: [
                { id: String(product_id) }, 
                { product_id: String(product_id) },
                ...(mongoose.Types.ObjectId.isValid(product_id) ? [{ _id: product_id }] : [])
            ] },
            { $set: { rating: Number(newRating.toFixed(1)), numReviews } },
            { new: true }
        );

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
