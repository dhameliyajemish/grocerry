import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchOrderHistory } from "../../actions/orders";
import styles from './order.module.css';
import { Link } from "react-router-dom";
import { cancelOrderUser } from "../../api/index";
import { toast } from "react-hot-toast";
import ReviewModal from "../../components/review-modal/ReviewModal";

const Order = () => {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrderForReview, setSelectedOrderForReview] = useState(null);

    const loadOrders = () => {
        setLoading(true);
        dispatch(fetchOrderHistory((data) => {
            setOrders(data);
            setLoading(false);
        }, (err) => {
            console.log(err);
            setLoading(false);
        }));
    };

    useEffect(() => {
        loadOrders();
    }, [dispatch]);

    const handleCancelOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        
        try {
            await cancelOrderUser(orderId);
            toast.success("Order Cancelled Successfully");
            loadOrders(); // Refresh the list
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to cancel order");
        }
    };

    if (loading) return <div className={styles.wrapper}>Loading...</div>;

    return (
        <div className={styles.wrapper}>
            <div className={'heading-wrapper'}>
                <h1 className={'heading'}>Your Orders</h1>
            </div>
            {orders.length === 0 ? (
                <div>No orders found.</div>
            ) : (
                <div className={styles.ordersList}>
                    {orders.map(order => (
                        <div key={order.order_id} className={styles.orderCard} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
                            <div className={styles.orderHeader} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span><strong>Order ID:</strong> {order.order_id}</span>
                                <span><strong>Status:</strong> {order.status}</span>
                                <span><strong>Date:</strong> {new Date(order.ordered_at).toLocaleDateString()}</span>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <span><strong>Payment Method:</strong> {order.payment_method}</span>
                            </div>
                            <div className={styles.orderTotal} style={{ marginBottom: '10px', fontSize: '1.1em', fontWeight: 'bold' }}>
                                Total: {order.total} ₹
                            </div>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <Link to={`/orders/${order.order_id}`} className="btn1">View Details</Link>
                                <Link to={`/shipping/${order.order_id}`} className="btn2">Track Shipment</Link>
                                <button 
                                    onClick={() => {
                                        const message = `📦 Order #${order.order_id}\nTotal: ₹${order.total}\nStatus: ${order.status}\n\nTrack: ${window.location.origin}/shipping/${order.order_id}`;
                                        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                                    }}
                                    style={{ 
                                        backgroundColor: '#25D366', 
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 12px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}
                                >
                                    📱 Share
                                </button>
                                
                                {order.status === "DELIVERED" && (
                                    <button 
                                        onClick={() => setSelectedOrderForReview(order)}
                                        style={{ 
                                            backgroundColor: '#FF9900', 
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 12px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        ⭐ Write Review
                                    </button>
                                )}

                                {(order.status === "CREATED" || order.status === "PROCESSING" || order.status === "PACKED") && (
                                    <button 
                                        onClick={() => handleCancelOrder(order.order_id)}
                                        style={{ 
                                            backgroundColor: '#ef4444', 
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 12px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedOrderForReview && (
                <ReviewModal 
                    order={selectedOrderForReview} 
                    onClose={() => setSelectedOrderForReview(null)} 
                />
            )}
        </div>
    );
}

export default Order;
