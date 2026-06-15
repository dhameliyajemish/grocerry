import styles from './navigation.module.css';
import Logo from '../../shared/assets/logo.png';
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SEARCH_HIDDEN, SEARCH_VISIBLE } from "./constants/search";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";

const Navigation = ({ cartCount, theme, toggleTheme }) => {
    const [search, setSearch] = useState(SEARCH_HIDDEN);
    const [menuActive, setMenuActive] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const searchElement = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(state => state.authentication.user);
    const auth = !!user;
    const admin = auth && user.role === 'ADMIN';
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setDropdown(false);
    }, [navigate]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        dispatch(logout);
        navigate('/login');
    }

    const handleSearch = () => {
        const width = window.innerWidth;

        if (width < 980 && search === SEARCH_HIDDEN) {
            setSearch(SEARCH_VISIBLE);
            setTimeout(() => searchElement.current?.focus(), 100);
        } else {
            if (searchInput.trim()) {
                navigate(`/products?search=${searchInput}`);
            }
            if (width < 980) {
                searchElement.current?.blur();
                setSearch(SEARCH_HIDDEN);
            }
            setSearchInput('');
        }
    }

    const closeMenu = () => setMenuActive(false);

    const handleHideMenu = (e) => {
        e.target.style.display = 'none';
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (target) target.click();
        e.target.style.display = '';
        setDropdown(false);
    }

    return (
        <header className={`${styles['wrapper']} ${scrolled ? styles['scrolled'] : ''} glass-panel`}>
            {search === SEARCH_VISIBLE && <div onClick={() => setSearch(SEARCH_HIDDEN)} className={styles['hide-search']} />}
            
            <Link to={'/'} className={styles['logo']}>
                <img className={styles['image-logo']} src={Logo} alt={'GrocerApp'} />
            </Link>

            <div className={`${styles['nav-wrapper']} ${menuActive ? styles['show-menu'] : ''}`}>
                <div onClick={closeMenu} className={styles['close-menu']}>
                    <span className={'material-symbols-outlined'}>close</span> Close
                </div>
                <nav className={styles['nav']}>
                    <Link onClick={closeMenu} to={'/'}>Home</Link>
                    {!auth && <Link className={styles['account']} onClick={closeMenu} to={'/login'}>Login/Sign Up</Link>}
                    <Link onClick={closeMenu} to={'/products'}>Products</Link>
                    {auth && <Link onClick={closeMenu} className={styles['account']} to={'/wishlist'}>Wishlist {user.wishlist?.length > 0 ? `(${user.wishlist?.length})` : ''}</Link>}
                    {auth && <Link onClick={closeMenu} className={styles['account']} to={'/orders'}>Previous Orders</Link>}
                    <Link onClick={closeMenu} to={'/shipping'}>Track Order</Link>
                    <Link onClick={closeMenu} to={'/contact'}>Contact Us</Link>
                    {admin && location.pathname !== '/admin' && <Link onClick={closeMenu} className={styles['account']} to={'/admin'}>Admin Panel</Link>}
                    {auth && <div className={styles['account']} onClick={() => { handleLogout(); closeMenu(); }}>Logout</div>}
                </nav>
            </div>

            <div className={styles['actions']}>
                <div className={`${styles['search-container']} ${search === SEARCH_VISIBLE ? styles['search-active'] : ''}`}>
                    <input 
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        value={searchInput}
                        placeholder={'Search products...'}
                        ref={searchElement}
                        className={styles['search']} 
                    />
                    <div onClick={handleSearch} className={`material-symbols-outlined ${styles['search-icon']}`}>search</div>
                </div>

                {/* Theme Toggle */}
                <div onClick={toggleTheme} className={`material-symbols-outlined ${styles['icon']}`} title="Toggle Theme">
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </div>

                <Link to={'/cart'} className={styles['icon-wrapper']}>
                    <span className={`material-symbols-outlined ${styles['icon']}`}>shopping_cart</span>
                    {cartCount > 0 && <span className={styles['cart-badge']}>{cartCount > 99 ? '99+' : cartCount}</span>}
                </Link>

                {auth ? (
                    <div className={styles['account-dropdown-wrapper']}>
                        <div onClick={() => setDropdown(!dropdown)} className={styles['user-profile']}>
                            <div className={styles['avatar']}>{user?.first_name?.charAt(0) || 'U'}</div>
                            <span className={styles['user-name']}>{user?.first_name}</span>
                        </div>
                        {dropdown && (
                            <div className={styles['account-dropdown']}>
                                <div onClick={handleHideMenu} className={styles['hide-dropdown']} />
                                <Link to={'/wishlist'} onClick={() => setDropdown(false)}>Wishlist</Link>
                                <Link to={'/orders'} onClick={() => setDropdown(false)}>Orders</Link>
                                {admin && location.pathname !== '/admin' && <Link to={'/admin'} onClick={() => setDropdown(false)}>Admin Panel</Link>}
                                <div onClick={handleLogout}>Logout</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to={'/login'} className={`material-symbols-outlined ${styles['icon']} ${styles['desktop-only']}`}>person</Link>
                )}

                <div onClick={() => setMenuActive(true)} className={`material-symbols-outlined ${styles['icon']} ${styles['menu-btn']}`}>
                    menu
                </div>
            </div>
        </header>
    );
}

export default Navigation;