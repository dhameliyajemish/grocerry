import styles from './footer.module.css';
import Logo from '../../shared/assets/logo.png';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className={styles['wrapper']}>
            <div className={styles['top-wrapper']}>
                <div className={styles['brand-section']}>
                    <div className={styles['logo-wrapper']}>
                        <img src={Logo} alt={'GrocerApp'} />
                    </div>
                    <p className={styles['brand-desc']}>
                        Fresh groceries delivered to your doorstep in 20 minutes. Quality products at the best prices.
                    </p>
                    <div className={styles['social-links']}>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles['social-icon']}>
                            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384031.png" alt="Instagram" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles['social-icon']}>
                            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384005.png" alt="Facebook" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles['social-icon']}>
                            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384017.png" alt="Twitter" />
                        </a>
                    </div>
                </div>
                
                <div className={styles['links-section']}>
                    <div className={styles['links-column']}>
                        <div className={styles['page-title']}>Quick Links</div>
                        <div className={styles['pages-list']}>
                            <Link to={'/'}>Home</Link>
                            <Link to={'/products'}>All Products</Link>
                            <Link to={'/cart'}>Shopping Cart</Link>
                            <Link to={'/orders'}>My Orders</Link>
                        </div>
                    </div>
                    
                    <div className={styles['links-column']}>
                        <div className={styles['page-title']}>Help & Support</div>
                        <div className={styles['pages-list']}>
                            <Link to={'/shipping'}>Track Order</Link>
                            <Link to={'/contact'}>Contact Us</Link>
                            <Link to={'/about'}>About Us</Link>
                        </div>
                    </div>

                    <div className={styles['links-column']}>
                        <div className={styles['page-title']}>Legal</div>
                        <div className={styles['pages-list']}>
                            <Link to={'/privacy'}>Privacy Policy</Link>
                            <Link to={'/terms'}>Terms & Conditions</Link>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles['bottom-bar']}>
                <div className={styles['copyright']}>
                    © {new Date().getFullYear()} Grocerry. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
