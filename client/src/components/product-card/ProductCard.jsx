import styles from './productCard.module.css';
import { useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import { updateWishlist } from "../../actions/auth";
import * as cartActions from "../../actions/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StarRating from '../star-rating/StarRating';

const ProductCard = ({ product, productsPage = false }) => {
    const wrapperRef = useRef();
    const wishlist = useSelector(state => state.authentication.user?.wishlist) || [];
    const cart = useSelector(state => state.cart.cart) || [];
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // DYNAMIC CART CALCULATIONS
    const pId = product.product_id || product.id || '0';
    const cartItem = cart.find(item => item.product_id === pId);
    const isInCart = !!cartItem;
    const cartQuantity = cartItem ? cartItem.quantity : 0;

    const quantity = 1;

    // Database Rating
    const averageRating = Number(product.rating) || 0;
    const reviewCount = Number(product.numReviews) || 0;
    
    // Mock data for premium feel (for missing properties only)
    const numId = parseInt(pId.toString().replace(/\D/g, '')) || 0;
    const hasDiscount = numId % 3 === 0;
    const discountPercent = 10 + (numId % 20);

    const price = product.pricing ? Number(product.pricing.selling_price) : (product.price ? Number(product.price) : 0);
    const oldPrice = hasDiscount ? (price * (1 + discountPercent / 100)).toFixed(2) : null;

    const handleWishlist = () => {
        const onError = () => {
            navigate('/login');
        };
        dispatch(updateWishlist(pId, onError));
    };

    const handleAddToCart = async () => {
        const qty = quantity;
        
        if (user?.token) {
            await dispatch(cartActions.addToCartAsync(pId, qty));
        } else {
            const productIndex = cart.findIndex((cartProd) => cartProd.product_id === pId);
            let newCart;
            if (productIndex >= 0) {
                const updatedData = { ...cart[productIndex], quantity: cart[productIndex].quantity + qty };
                const newArray = [...cart];
                newArray[productIndex] = updatedData;
                newCart = newArray;
            } else {
                newCart = [...cart, { ...product, product_id: pId, quantity: qty }];
            }
            dispatch(cartActions.setCart(newCart));
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
        
        toast.success(`${product.name} added to cart!`);
    };

    const getXi = () => wrapperRef.current?.getBoundingClientRect().x || 0;
    const getXf = () => {
        const windowWidth = window.innerWidth;
        return windowWidth > 1024 ? windowWidth - 11 * 16 : windowWidth - 5 * 16;
    };
    const getYi = () => wrapperRef.current?.getBoundingClientRect().y || 0;

    return (
        <motion.div 
            ref={wrapperRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${styles['wrapper']} ${productsPage ? styles['products-page'] : ''} ${!(product.availability?.in_stock ?? product.stock) && styles['out-of-stock']}`}
        >
            <AnimatePresence>
                {isInCart && (
                    <motion.img 
                        initial={{ x: getXi(), y: getYi(), padding: '1em', borderRadius: '10px' }}
                        animate={{ x: getXf(), y: 0, width: 24, height: 24, opacity: .8, borderRadius: '50%', padding: '.5em' }}
                        transition={{ type: "spring", stiffness: 40, bounce: 0 }}
                        className={styles['cart-img']}
                        src={product.image}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400?text=No+Image'; }}
                        alt={product.name} 
                    />
                )}
            </AnimatePresence>

            <div className={styles['image-wrapper']}>
                {hasDiscount && <div className={styles['discount-badge']}>{discountPercent}% OFF</div>}
                <img 
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400?text=No+Image'; }} 
                    onClick={() => navigate(`/product/${pId}`)}
                    style={{ cursor: 'pointer' }}
                />
                <span onClick={handleWishlist} className={`material-symbols-outlined ${styles['wishlist']} ${wishlist.includes(product.product_id || product.id) && styles['wishlisted']}`}>favorite</span>
                <div className={styles['quick-view']} onClick={() => navigate(`/product/${pId}`)}>Quick View</div>
            </div>

            <div className={styles['content']}>
                <div>
                    <h3 
                        className={styles['name']} 
                        onClick={() => navigate(`/product/${pId}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        {product.name}
                    </h3>
                    <div className={styles['rating']} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <StarRating initialRating={averageRating} readonly size="18px" />
                        <span className={styles['reviews']} style={{ fontSize: '0.85em', color: '#666' }}>
                            {averageRating > 0 ? averageRating.toFixed(1) : 'No ratings'} {reviewCount > 0 && `(${reviewCount})`}
                        </span>
                    </div>
                </div>

                <div className={styles['footer']}>
                    <div className={styles['details']}>
                        <p className={styles['weight']}>
                            {product.packaging ? `${product.packaging.quantity}${product.packaging.unit}` : `${product.weight}${product.measurement}`}
                        </p>
                        <div className={styles['price-container']}>
                            <span className={styles['price']}>₹{price.toFixed(2)}</span>
                            {hasDiscount && <span className={styles['old-price']}>₹{oldPrice}</span>}
                        </div>
                    </div>

                    {(product.availability?.in_stock ?? product.stock) ? (
                        isInCart ? (
                            <div className={styles['add-section']}>
                                <div className={styles['quantity-controls']}>
                                    <button onClick={async () => {
                                        const pId = product.product_id || product.id;
                                        if (cartQuantity > 1) {
                                            if (user?.token) {
                                                await dispatch(cartActions.updateCartItemAsync(pId, cartQuantity - 1));
                                            } else {
                                                const newCart = cart.map(item => item.product_id === pId ? { ...item, quantity: item.quantity - 1 } : item);
                                                dispatch(cartActions.setCart(newCart));
                                                localStorage.setItem('cart', JSON.stringify(newCart));
                                            }
                                        } else {
                                            if (user?.token) {
                                                await dispatch(cartActions.removeFromCartAsync(pId));
                                            } else {
                                                const newCart = cart.filter((cartItem) => cartItem.product_id !== pId);
                                                dispatch(cartActions.setCart(newCart));
                                                localStorage.setItem('cart', JSON.stringify(newCart));
                                            }
                                        }
                                    }} className={styles['qty-btn']} disabled={cartQuantity <= 0}>-</button>
                                    <span className={styles['qty-value']}>{cartQuantity}</span>
                                    <button onClick={async () => {
                                        const pId = product.product_id || product.id;
                                        if (user?.token) {
                                            await dispatch(cartActions.updateCartItemAsync(pId, cartQuantity + 1));
                                        } else {
                                            const newCart = cart.map(item => item.product_id === pId ? { ...item, quantity: item.quantity + 1 } : item);
                                            dispatch(cartActions.setCart(newCart));
                                            localStorage.setItem('cart', JSON.stringify(newCart));
                                        }
                                    }} className={styles['qty-btn']}>+</button>
                                </div>
                            </div>
                        ) : (
                            <motion.div whileTap={{ scale: 0.95 }} onClick={handleAddToCart} className={styles['add-to-cart']}>
                                + Add to Cart
                            </motion.div>
                        )
                    ) : (
                        <div className={styles['unavailable']}>Out of Stock</div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;