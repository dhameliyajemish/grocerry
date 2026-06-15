import styles from './home.module.css';
import { Link } from "react-router-dom";
import Categories from "../../components/categories/Categories";
import ProductCard from "../../components/product-card/ProductCard";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import { getRecommendations } from "../../actions/products";

const Home = () => {
    const products = useSelector(state => state.products.recommendations) || [];
    const cart = useSelector(state => state.cart.cart) || [];
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecommendations(() => setLoading(false)));
    }, [dispatch]);

    const reviews = [
        { id: 1, name: "Sarah Jenkins", rating: 5, text: "Fastest grocery delivery ever! The vegetables were incredibly fresh.", role: "Regular Customer" },
        { id: 2, name: "Michael Chen", rating: 5, text: "Love the new design and how easy it is to find everything. 10/10.", role: "Premium Member" },
        { id: 3, name: "Priya Sharma", rating: 4, text: "Great variety of products and amazing discounts on daily essentials.", role: "Customer" },
    ];

    // Mock today's deals from recommended products
    const deals = products.length > 0 ? products[0].products.slice(0, 5) : [];

    return (
        <div className={styles['wrapper']}>
            <section className={styles['hero-section']}>
                <div className={styles['hero-content']}>
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={styles['hero-text-content']}
                    >
                        <div className={styles['badge']}>⚡ Lightning Fast Delivery</div>
                        <h1>Fresh Groceries Delivered To Your <span>Doorstep</span></h1>
                        <p>Get fruits, vegetables, dairy products and daily essentials delivered in just 20 minutes.</p>
                        <div className={styles['cta-group']}>
                            <Link className={styles['btn-primary']} to={'/products'}>Shop Now</Link>
                            <a href="#categories" className={styles['btn-secondary']}>Explore Categories</a>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={styles['hero-image-wrapper']}
                    >
                        <div className={styles['image-bg-blob']}></div>
                        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fresh Groceries" className={styles['hero-main-img']} />
                        
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className={`${styles['floating-card']} ${styles['card-1']}`}>
                            <span className="material-symbols-outlined">timer</span>
                            <div>
                                <h4>20 Min</h4>
                                <span>Delivery</span>
                            </div>
                        </motion.div>
                        
                        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className={`${styles['floating-card']} ${styles['card-2']}`}>
                            <span className="material-symbols-outlined">group</span>
                            <div>
                                <h4>50K+</h4>
                                <span>Happy Customers</span>
                            </div>
                        </motion.div>
                        
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5 }} className={`${styles['floating-card']} ${styles['card-3']}`}>
                            <span className="material-symbols-outlined" style={{color: '#FFD700'}}>star</span>
                            <div>
                                <h4>4.8</h4>
                                <span>Store Rating</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section id="categories" className={styles['section']}>
                <div className={styles['section-header']}>
                    <h2>Shop by <span>Categories</span></h2>
                    <p>Explore our wide range of fresh products</p>
                </div>
                <Categories />
            </section>

            {loading ? (
                <section className={styles['section']}>
                    <div className={styles['section-header']}>
                        <h2>Loading Products...</h2>
                    </div>
                    <Loading type="products" count={10} />
                </section>
            ) : (
                <>
                    {deals.length > 0 && (
                        <section className={`${styles['section']} ${styles['deals-section']}`}>
                            <div className={styles['section-header']}>
                                <h2>Today's <span>Top Deals</span></h2>
                                <p>Grab them before they're gone!</p>
                            </div>
                            <div className={styles['products-grid']}>
                                {deals.map((product, j) => {
                                    const productId = product.product_id || product.id;
                                    const isInCart = cart?.some(c => (c.product_id || c.id) === productId);
                                    const cartItem = cart?.find(c => (c.product_id || c.id) === productId);
                                    return <ProductCard product={product} key={`deal-${j}`} isInCart={isInCart} cartQuantity={cartItem?.quantity || 0} />
                                })}
                            </div>
                        </section>
                    )}

                    {products.map((item, i) => (
                        <section key={i} className={styles['section']}>
                            <div className={styles['section-header']}>
                                <h2>Recommended in <span>{item.category}</span></h2>
                                <Link to={`/products?category=${item.category}`} className={styles['see-all-link']}>View All <span className="material-symbols-outlined">arrow_forward</span></Link>
                            </div>
                            <div className={styles['products-grid']}>
                                {item.products.map((product, j) => {
                                    const productId = product.product_id || product.id;
                                    const isInCart = cart?.some(c => (c.product_id || c.id) === productId);
                                    const cartItem = cart?.find(c => (c.product_id || c.id) === productId);
                                    return <ProductCard product={product} key={`${i}-${j}`} isInCart={isInCart} cartQuantity={cartItem?.quantity || 0} />;
                                })}
                            </div>
                        </section>
                    ))}
                </>
            )}

            <section className={`${styles['section']} ${styles['reviews-section']}`}>
                <div className={styles['section-header']}>
                    <h2>What our <span>Customers Say</span></h2>
                    <p>Don't just take our word for it</p>
                </div>
                <div className={styles['reviews-grid']}>
                    {reviews.map(review => (
                        <div key={review.id} className={styles['review-card']}>
                            <div className={styles['review-stars']}>
                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                            </div>
                            <p className={styles['review-text']}>"{review.text}"</p>
                            <div className={styles['review-author']}>
                                <div className={styles['author-avatar']}>
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4>{review.name}</h4>
                                    <span>{review.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;