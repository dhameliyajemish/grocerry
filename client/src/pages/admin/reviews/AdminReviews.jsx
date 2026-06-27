import React, { useEffect, useState } from 'react';
import { adminGetAllReviews, adminDeleteReview } from '../../../api/index';
import { toast } from 'react-hot-toast';
import styles from './adminReviews.module.css';

const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterRating, setFilterRating] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const loadReviews = async () => {
        setLoading(true);
        try {
            const { data } = await adminGetAllReviews();
            setReviews(data.reviews || []);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
            toast.error(error?.response?.data?.message || "Failed to load reviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
            return;
        }

        try {
            await adminDeleteReview(reviewId);
            toast.success("Review deleted successfully!");
            setReviews(reviews.filter(r => r._id !== reviewId));
        } catch (error) {
            console.error("Failed to delete review:", error);
            toast.error(error?.response?.data?.message || "Failed to delete review");
        }
    };

    // Filter and search logic
    const filteredReviews = reviews.filter(review => {
        const matchesRating = filterRating === 'all' || review.rating === Number(filterRating);
        
        const productName = review.product?.name?.toLowerCase() || '';
        const userName = `${review.user?.first_name || ''} ${review.user?.last_name || ''}`.toLowerCase();
        const userEmail = review.user?.email?.toLowerCase() || '';
        const comment = review.comment?.toLowerCase() || '';
        
        const matchesSearch = searchTerm === '' || 
            productName.includes(searchTerm.toLowerCase()) ||
            userName.includes(searchTerm.toLowerCase()) ||
            userEmail.includes(searchTerm.toLowerCase()) ||
            comment.includes(searchTerm.toLowerCase());

        return matchesRating && matchesSearch;
    });

    const renderStars = (rating) => {
        return (
            <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map(star => (
                    <span 
                        key={star} 
                        className={`${styles.star} ${star <= rating ? styles.active : ''}`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div>
                    <h1 className="heading">Product Reviews</h1>
                    <p className={styles.subtitle}>Moderate and manage customer feedback</p>
                </div>
                <div className={styles.stats}>
                    <span className={styles.statItem}>Total Reviews: <strong>{reviews.length}</strong></span>
                    <span className={styles.statItem}>Filtered: <strong>{filteredReviews.length}</strong></span>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className={styles.toolbar}>
                <div className={styles.searchWrapper}>
                    <span className="material-symbols-outlined">search</span>
                    <input 
                        type="text" 
                        placeholder="Search product, customer, or comment..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className={styles.searchInput}
                    />
                </div>
                
                <div className={styles.filterWrapper}>
                    <label>Rating:</label>
                    <select 
                        value={filterRating} 
                        onChange={(e) => setFilterRating(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="all">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Loading reviews...</p>
                </div>
            ) : filteredReviews.length === 0 ? (
                <div className={styles.empty}>
                    <span className="material-symbols-outlined">rate_review</span>
                    <h3>No Reviews Found</h3>
                    <p>There are no reviews matching your filters.</p>
                </div>
            ) : (
                <div className={styles.reviewsGrid}>
                    {filteredReviews.map(review => (
                        <div key={review._id} className={styles.reviewCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.productInfo}>
                                    <img 
                                        src={review.product?.image || '/placeholder-grocery.png'} 
                                        alt={review.product?.name} 
                                        className={styles.productImage}
                                        onError={(e) => { e.target.src = 'https://placehold.co/100?text=Product'; }}
                                    />
                                    <div>
                                        <h4 className={styles.productName}>{review.product?.name}</h4>
                                        <span className={styles.orderId}>Order ID: #{review.order_id}</span>
                                    </div>
                                </div>
                                <button 
                                    className={styles.deleteBtn}
                                    onClick={() => handleDelete(review._id)}
                                    title="Delete Review"
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>

                            <div className={styles.cardBody}>
                                <div className={styles.ratingInfo}>
                                    {renderStars(review.rating)}
                                    <span className={styles.date}>
                                        {new Date(review.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <p className={styles.comment}>
                                    {review.comment ? `"${review.comment}"` : <em>No written comment provided.</em>}
                                </p>
                            </div>

                            <div className={styles.cardFooter}>
                                <div className={styles.userInfo}>
                                    <span className="material-symbols-outlined">person</span>
                                    <div>
                                        <span className={styles.userName}>{review.user?.first_name} {review.user?.last_name}</span>
                                        <span className={styles.userEmail}>{review.user?.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminReviews;
