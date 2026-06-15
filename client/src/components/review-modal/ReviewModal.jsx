import React, { useEffect, useState } from 'react';
import styles from './reviewModal.module.css';
import { fetchOrderReviews, submitReview } from '../../api/index';
import { toast } from 'react-hot-toast';

const ReviewModal = ({ order, onClose }) => {
    const [reviewedProductIds, setReviewedProductIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeProduct, setActiveProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const { data } = await fetchOrderReviews(order.order_id);
                setReviewedProductIds(data.map(r => r.product_id));
            } catch (error) {
                console.error("Failed to load reviews:", error);
            } finally {
                setLoading(false);
            }
        };
        loadReviews();
    }, [order]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) return toast.error("Please select a rating.");
        setSubmitting(true);
        try {
            await submitReview({
                order_id: order.order_id,
                product_id: activeProduct.product_id || activeProduct.id,
                rating,
                comment
            });
            toast.success("Review submitted successfully!");
            setReviewedProductIds([...reviewedProductIds, activeProduct.product_id || activeProduct.id]);
            setActiveProduct(null);
            setRating(0);
            setComment('');
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles['modal-overlay']} onClick={onClose}>
            <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
                <button className={styles['close-btn']} onClick={onClose}>&times;</button>
                <h2 className={styles['modal-title']}>Review Order #{order.order_id}</h2>
                
                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <div className={styles['product-list']}>
                        {order.products.map(product => {
                            const pId = product.product_id || product.id;
                            const isReviewed = reviewedProductIds.includes(pId);
                            const isActive = activeProduct && (activeProduct.product_id || activeProduct.id) === pId;

                            return (
                                <div key={pId} className={styles['product-item']}>
                                    <img src={product.image} alt={product.name} className={styles['product-image']} />
                                    <div className={styles['product-info']}>
                                        <div className={styles['product-name']}>{product.name}</div>
                                        
                                        {!isActive && (
                                            <div className={styles['review-action']}>
                                                {isReviewed ? (
                                                    <span className={styles['reviewed-badge']}>✅ Reviewed</span>
                                                ) : (
                                                    <button 
                                                        className={styles['rate-btn']}
                                                        onClick={() => {
                                                            setActiveProduct(product);
                                                            setRating(0);
                                                            setComment('');
                                                        }}
                                                    >
                                                        ⭐ Write Review
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        {isActive && (
                                            <form className={styles['review-form']} onSubmit={handleSubmit}>
                                                <div className={styles['stars']}>
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <span 
                                                            key={star} 
                                                            className={`${styles['star']} ${star <= rating ? styles['active'] : ''}`}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                                <textarea 
                                                    className={styles['comment-input']}
                                                    placeholder="Write your experience with this product..."
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    maxLength={500}
                                                />
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button type="submit" className={styles['submit-btn']} disabled={submitting}>
                                                        {submitting ? 'Submitting...' : 'Submit'}
                                                    </button>
                                                    <button type="button" className={styles['cancel-btn']} onClick={() => setActiveProduct(null)}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewModal;
