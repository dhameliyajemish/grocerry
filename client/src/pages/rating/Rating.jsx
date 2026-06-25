import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import StarRating from '../../components/star-rating/StarRating';
import { toast } from 'react-toastify';
import { submitReview } from '../../api/index';
import styles from './rating.module.css';

const Rating = () => {
    const { orderId, productId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Check if product details were passed via state
    const product = location.state?.product || {};

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) {
            return toast.error("Please provide a rating");
        }

        const profileStr = localStorage.getItem('profile');
        if (!profileStr) {
            return toast.error("You must be logged in to submit a review");
        }

        const profile = JSON.parse(profileStr);
        const user_id = profile.user?._id || profile.user?.id; // Depends on backend user model structure

        if (!user_id) {
             return toast.error("User session invalid, please log in again");
        }

        setIsSubmitting(true);
        try {
            await submitReview({
                user_id,
                order_id: orderId,
                product_id: productId,
                rating,
                comment
            });
            toast.success("Review submitted successfully!");
            navigate(`/orders/${orderId}`);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Rate Product</h2>
                {product.name && <h4 className={styles.productName}>{product.name}</h4>}
                
                <div className={styles.ratingWrapper}>
                    <StarRating initialRating={rating} onChange={(rate) => setRating(rate)} size="40px" />
                    <span className={styles.ratingText}>{rating > 0 ? `${rating} / 5` : 'Select a rating'}</span>
                </div>

                <div className={styles.formGroup}>
                    <label>Comment (Optional)</label>
                    <textarea 
                        rows={4}
                        placeholder="Write your review here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <div className={styles.actions}>
                    <button className="btn2" onClick={() => navigate(-1)} disabled={isSubmitting}>Cancel</button>
                    <button className="btn1" onClick={handleSubmit} disabled={isSubmitting || rating === 0}>
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Rating;
