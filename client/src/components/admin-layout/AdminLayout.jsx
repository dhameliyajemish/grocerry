import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import Logo from '../../shared/assets/logo.png';
import styles from './adminLayout.module.css';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    const handleLogout = () => {
        dispatch(logout);
        navigate('/login');
    };


    // Close sidebar on mobile when navigating
    useEffect(() => {
        setSidebarOpen(false);
    }, [location]);

    const menuItems = [
        { path: '/admin', label: 'Dashboard', icon: 'dashboard', end: true },
        { path: '/admin/orders', label: 'All Orders', icon: 'list_alt', end: true },
        { path: '/admin/orders/new', label: 'New Order', icon: 'add_shopping_cart' },
        { path: '/admin/orders/update', label: 'Update Order', icon: 'edit_note' },
        { path: '/admin/shipping', label: 'Shipments', icon: 'local_shipping', end: true },
        { path: '/admin/shipping/update', label: 'Update Shipment', icon: 'edit_square' },
        { path: '/admin/products/new', label: 'New Product', icon: 'add_box' },
        { path: '/admin/products/update', label: 'Upload Products', icon: 'upload_file' },
        { path: '/admin/reviews', label: 'All Reviews', icon: 'rate_review', end: true },
    ];

    return (
        <div className={styles['admin-container']}>
            {/* Mobile Header */}
            <div className={styles['mobile-header']}>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className={styles['menu-btn']}>
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div className={styles['mobile-brand']}>
                    <img src={Logo} alt="Logo" className={styles['logo-img']} />
                    <span>Admin Panel</span>
                </div>
                <button onClick={toggleTheme} className={styles['icon-btn']}>
                    <span className="material-symbols-outlined">
                        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>
            </div>

            {/* Sidebar overlay for mobile */}
            {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className={styles['sidebar-overlay']} />}

            {/* Sidebar */}
            <aside className={`${styles['sidebar']} ${sidebarOpen ? styles['sidebar-open'] : ''}`}>
                <div className={styles['sidebar-header']}>
                    <Link to="/" className={styles['brand-link']}>
                        <img src={Logo} alt="GrocerApp Logo" className={styles['logo-img']} />
                        <span className={styles['brand-text']}>GrocerApp</span>
                    </Link>
                    <span className={styles['badge']}>Admin</span>
                </div>

                <nav className={styles['sidebar-nav']}>
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) => 
                                `${styles['nav-item']} ${isActive ? styles['nav-item-active'] : ''}`
                            }
                        >
                            <span className={`material-symbols-outlined ${styles['nav-icon']}`}>{item.icon}</span>
                            <span className={styles['nav-label']}>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className={styles['sidebar-footer']}>
                    {user && (
                        <div className={styles['user-profile']}>
                            <div className={styles['avatar']}>{user.first_name?.charAt(0) || 'A'}</div>
                            <div className={styles['user-info']}>
                                <span className={styles['user-name']}>{user.first_name} {user.last_name}</span>
                                <span className={styles['user-role']}>Administrator</span>
                            </div>
                        </div>
                    )}
                    <div className={styles['footer-actions']}>
                        <button onClick={toggleTheme} className={styles['footer-btn']} title="Toggle Theme">
                            <span className="material-symbols-outlined">
                                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>
                        <Link to="/" className={styles['footer-btn']} title="Go to Store">
                            <span className="material-symbols-outlined">store</span>
                        </Link>
                        <button onClick={handleLogout} className={styles['logout-btn']} title="Logout">
                            <span className="material-symbols-outlined">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={styles['main-content']}>


                {/* Subpage Container */}
                <main className={styles['page-container']}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
