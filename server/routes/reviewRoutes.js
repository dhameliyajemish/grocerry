import express from 'express';
import auth from '../middleware/auth.js';
import { createReview, getReviewsByOrder, getProductReviews } from '../controllers/reviewController.js';

const router = express.Router();

// Get reviews for a specific order (requires auth to verify ownership)
router.get('/order/:orderId', auth, getReviewsByOrder);

// Get reviews for a specific product (public)
router.get('/product/:productId', getProductReviews);

// Create a new review (requires auth)
router.post('/', auth, createReview);

export default router;
