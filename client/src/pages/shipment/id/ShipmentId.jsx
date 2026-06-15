import styles from './shipmentId.module.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/loading/Loading";
import { fetchShipment } from "../../../actions/shipping";
import Delivery from '../../../shared/assets/tracking/delivery.png';
import { fetchOrderReviews, submitReview } from "../../../api/index";
import { fetchOrder } from "../../../actions/orders";
import { toast } from "react-hot-toast";

const ShipmentId = () => {

    const { id } = useParams();
    const shipment = useSelector(state => state.shipping.fetched);
    const order = useSelector(state => state.orders.fetched);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Review states
    const [reviewedProductIds, setReviewedProductIds] = useState([]);
    const [ratings, setRatings] = useState({});
    const [comments, setComments] = useState({});
    const [submitting, setSubmitting] = useState({});

    useEffect(() => {
        const onSuccess = () => {
            setLoading(false);
        }

        const onError = (e) => {
            setLoading(false);
            navigate('/404')
        }

        if (shipment && shipment.order_id === id)
            onSuccess();
        else
            dispatch(fetchShipment(id, onSuccess, onError))

    }, [dispatch, id, navigate, shipment]);

    // Fetch Order and Reviews if DELIVERED
    useEffect(() => {
        if (shipment?.status === 'DELIVERED') {
            dispatch(fetchOrder(shipment.order_id, () => {}, () => {}));
            
            fetchOrderReviews(shipment.order_id)
                .then(({ data }) => setReviewedProductIds(data.map(r => r.product_id)))
                .catch(err => console.error("Failed to fetch reviews:", err));
        }
    }, [shipment, dispatch]);

    const handleReviewSubmit = async (e, product) => {
        e.preventDefault();
        const pId = product.product_id || product.id;
        const rating = ratings[pId] || 0;
        const comment = comments[pId] || '';

        if (rating === 0) return toast.error("Please select a rating.");
        
        setSubmitting(prev => ({ ...prev, [pId]: true }));
        try {
            await submitReview({
                order_id: shipment.order_id,
                product_id: pId,
                rating,
                comment
            });
            toast.success("Review submitted successfully!");
            setReviewedProductIds(prev => [...prev, pId]);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to submit review");
        } finally {
            setSubmitting(prev => ({ ...prev, [pId]: false }));
        }
    };

    const capitalizeFirst = (m) => {
        return m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();
    }

    const getProgress = () => {
        switch (shipment?.status) {
            case 'CREATED': return 20;
            case 'PROCESSING': return 40;
            case 'PACKED': return 60;
            case 'OUT_FOR_DELIVERY': return 85;
            case 'DELIVERED': return 100;
            case 'CANCELLED': return 100;
            default: return 5;
        }
    }

    const shareOnWhatsApp = () => {
        const waStatusMessages = {
            'CREATED': `created!`,
            'PROCESSING': `processing...`,
            'PACKED': `packed!`,
            'OUT_FOR_DELIVERY': `out for delivery!`,
            'DELIVERED': `delivered! ✅`,
            'RETURNED': `returned.`,
            'CANCELLED': `cancelled.`
        };

        const status = waStatusMessages[shipment?.status] || shipment?.status;
        const message = `Hello! Greetings from Grocerry. \n\nMy Order ID is: #${shipment?.order_id}\nOrder Status: ${status}`;
        const trackUrl = `${window.location.origin}/shipping/${shipment?.order_id}`;
        const fullMessage = `${message}\n\nTrack your order here: ${trackUrl}`;

        const cleanPhone = shipment?.phone_number ? shipment.phone_number.replace(/\D/g, '') : '';
        const waUrl = cleanPhone
            ? `https://wa.me/${cleanPhone}/?text=${encodeURIComponent(fullMessage)}`
            : `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;

        window.open(waUrl, '_blank');
    }

    if (loading)
        return <Loading />

    const statusMessages = {
        'CREATED': "Your order has been Created.",
        'PROCESSING': "Your order is being Processed.",
        'PACKED': "Your order has been Packed.",
        'OUT_FOR_DELIVERY': "Your order is Out for Delivery.",
        'DELIVERED': "Your order has been Delivered.",
        'RETURNED': "Your order has been Returned.",
        'CANCELLED': "Your order has been Cancelled."
    };

    const deliveryMessage = statusMessages[shipment?.status] || "Order status unavailable";

    return (
        <div className={styles['wrapper']}>
            <div className={'heading'}>
                <h1>Track Shipping</h1>
            </div>
            <div className={styles['sub']}>
                Order <span>#{shipment?.order_id}</span>
            </div>
            <div className={styles['full-progress']}>
                <div 
                    className={styles['progress']} 
                    style={{ 
                        width: getProgress() + '%',
                        background: shipment?.status === 'CANCELLED' ? 'linear-gradient(90deg, #ef4444, #dc2626)' : undefined
                    }}
                >
                    {shipment?.status !== 'CANCELLED' && (
                        <img className={styles['img']}
                            style={{ transform: shipment?.status === 'RETURNED' ? 'scaleX(-1)' : '' }} src={Delivery}
                            alt={'Delivery'} />
                    )}
                </div>
            </div>
            <div className={styles['status']}>
                <p>
                    <strong>Delivery Update:</strong>{' '}
                    {shipment?.status === 'CANCELLED' ? (
                        <span style={{ color: '#dc2626', fontWeight: 'bold' }}>❌ Order Cancelled</span>
                    ) : (
                        deliveryMessage
                    )}
                </p>
            </div>

            {/* REVIEW SECTION FOR DELIVERED ORDERS */}
            {shipment?.status === 'DELIVERED' && order && order.products && (
                <div className={styles['review-container']}>
                    <h2 style={{ fontSize: '1.3rem', color: '#333' }}>⭐ Rate Your Experience</h2>
                    
                    {order.products.map((product) => {
                        const pId = product.product_id || product.id;
                        const isReviewed = reviewedProductIds.includes(pId);
                        const currentRating = ratings[pId] || 0;

                        return (
                            <div key={pId} className={styles['review-card']}>
                                <div className={styles['review-header']}>
                                    <img src={product.image} alt={product.name} className={styles['review-img']} />
                                    <div className={styles['review-title']}>{product.name}</div>
                                </div>
                                
                                {isReviewed ? (
                                    <div className={styles['reviewed-state']}>
                                        <div style={{ color: '#FF9900', fontSize: '24px' }}>
                                            ⭐⭐⭐⭐⭐
                                        </div>
                                        <div style={{ fontStyle: 'italic', color: '#666' }}>Thanks for your feedback!</div>
                                        <span className={styles['reviewed-badge']}>✅ Reviewed</span>
                                    </div>
                                ) : (
                                    <form onSubmit={(e) => handleReviewSubmit(e, product)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <div className={styles['stars-container']}>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <span 
                                                    key={star} 
                                                    className={`${styles['star']} ${star <= currentRating ? styles['star-active'] : ''}`}
                                                    onClick={() => setRatings(prev => ({ ...prev, [pId]: star }))}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <textarea 
                                            className={styles['review-textarea']}
                                            placeholder="Write your review here..."
                                            value={comments[pId] || ''}
                                            onChange={(e) => setComments(prev => ({ ...prev, [pId]: e.target.value }))}
                                            maxLength={500}
                                        />
                                        <button 
                                            type="submit" 
                                            className={styles['submit-review-btn']} 
                                            disabled={submitting[pId]}
                                        >
                                            {submitting[pId] ? 'Submitting...' : 'Submit Review'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                    onClick={shareOnWhatsApp}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        backgroundColor: '#25D366',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    <span>📱</span> Share on WhatsApp
                </button>
            </div>
        </div>
    );
}

export default ShipmentId;