import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProductById, fetchProductReviews, submitReview, checkReviewEligibility } from '../../api';
import styles from './productDetails.module.css';
import Loading from '../../components/loading/Loading';
import StarRating from '../../components/star-rating/StarRating';
import { toast } from 'react-toastify';

const ProductDetails = ({ addProductToCart, cart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.authentication.user);

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [isEligibleToReview, setIsEligibleToReview] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const { data: prodData } = await getProductById(id);
                setProduct(prodData);

                try {
                    const { data: revData } = await fetchProductReviews(id);
                    setReviews(revData);
                } catch (revErr) {
                    console.error("Failed to load reviews:", revErr);
                }

                if (user?.token) {
                    try {
                        const { data: eligData } = await checkReviewEligibility(id);
                        setIsEligibleToReview(eligData.eligible);
                    } catch (e) {
                        console.error("Failed to check eligibility", e);
                    }
                }

            } catch (err) {
                console.error("Failed to load product details:", err);
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id, user?.token]);

    const handleAddToCart = () => {
        if (product) {
            addProductToCart({ ...product, product_id: product.id });
            toast.success(`${product.name} added to cart!`);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!rating) return toast.error("Please select a rating.");

        setSubmitting(true);
        try {
            await submitReview({
                product_id: id,
                rating,
                comment
            });
            toast.success('Review submitted successfully!');
            setRating(0);
            setComment('');

            // Reload reviews and product data
            const { data: revData } = await fetchProductReviews(id);
            setReviews(revData);
            const { data: prodData } = await getProductById(id);
            setProduct(prodData);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Loading text="Loading Product..." />;
    if (error) return <div className={styles.errorContainer}><h2>{error}</h2><button onClick={() => navigate('/products')} className="btn1">Back to Products</button></div>;
    if (!product) return <div className={styles.errorContainer}><h2>Product Not Found</h2></div>;

    const inStock = product.availability?.in_stock ?? product.stock > 0;
    const price = product.pricing?.selling_price || product.price || 0;

    return (
        <div className={styles.container}>
            <button className={styles.backBtn} onClick={() => navigate('/products')}>&larr; Back to Products</button>

            <div className={styles.productGrid}>
                <div className={styles.imageSection}>
                    <img src={product.image} alt={product.name} className={styles.mainImage} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400?text=No+Image'; }} />
                </div>

                <div className={styles.detailsSection}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <div className={styles.brandCategory}>
                        <span className={styles.brand}>Brand: {product.brand || 'Generic'}</span>
                        <span className={styles.category}>Category: {product.category}</span>
                    </div>

                    <div
                        className={styles.ratingSummary}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            const section = document.getElementById('reviews-section');
                            if (section) section.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <StarRating initialRating={product.rating || 0} readonly size="24px" />
                        <span className={styles.reviewCount}>({product.numReviews || 0} Reviews)</span>
                    </div>

                    <div className={styles.price}>₹{price.toFixed(2)}</div>

                    <div className={styles.stockStatus}>
                        {inStock ? <span className={styles.inStock}>In Stock</span> : <span className={styles.outOfStock}>Out of Stock</span>}
                    </div>

                    <div className={styles.description}>
                        <h3>Description</h3>
                        <p>{product.description || 'No description available for this product.'}</p>
                    </div>

                    <button
                        className={`${styles.addToCartBtn} ${!inStock ? styles.disabled : ''}`}
                        onClick={handleAddToCart}
                        disabled={!inStock}
                    >
                        {inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>

            <div id="reviews-section" className={styles.reviewsSection}>
                <h2>Customer Reviews</h2>

                {(!user?.token || !isEligibleToReview) ? (
                    <div className={styles.loginPrompt}>
                        Please purchase the product to give a review.
                    </div>
                ) : (
                    <form className={styles.reviewForm} onSubmit={handleReviewSubmit}>
                        <h3>Write a Review</h3>
                        <div className={styles.formGroup}>
                            <label>Rating:</label>
                            <StarRating initialRating={rating} onChange={setRating} size="28px" />
                        </div>
                        <div className={styles.formGroup}>
                            <textarea 
                                placeholder="Share your thoughts about this product..."
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                rows="4"
                                maxLength="500"
                            ></textarea>
                        </div>
                        <button type="submit" disabled={submitting} className={styles.submitBtn}>
                            {submitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                )}

                <div className={styles.reviewsList}>
                    {reviews.length === 0 ? (
                        <p className={styles.noReviews}>No reviews yet. Be the first to review this product!</p>
                    ) : (
                        reviews.map(review => (
                            <div key={review._id} className={styles.reviewCard}>
                                <div className={styles.reviewHeader}>
                                    <span className={styles.reviewerName}>{review.user?.first_name} {review.user?.last_name || ''}</span>
                                    <span className={styles.reviewDate}>{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className={styles.reviewRating}>
                                    <StarRating initialRating={review.rating} readonly size="16px" />
                                </div>
                                {review.comment && <p className={styles.reviewComment}>{review.comment}</p>}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
