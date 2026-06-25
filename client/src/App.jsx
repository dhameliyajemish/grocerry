import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as cartActions from "./actions/cart";
import './shared/css/master.css';
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import PrivateRoute from "./components/privete-route/PrivateRoute";
import Loading from "./components/loading/Loading";

// Lazy loaded pages
const Home = lazy(() => import("./pages/home/Home"));
const CartPage = lazy(() => import("./pages/cart/Cart"));
const Order = lazy(() => import("./pages/order/Order"));
const ForgotPassword = lazy(() => import("./pages/authentication/forgot-password/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/authentication/forgot-password/ResetPassword"));
const Signup = lazy(() => import("./pages/authentication/signup/Signup"));
const Shipment = lazy(() => import("./pages/shipment/Shipment"));
const Login = lazy(() => import("./pages/authentication/login/Login"));
const Wishlist = lazy(() => import("./pages/wishlist/Wishlist"));
const Error401 = lazy(() => import("./pages/errors/401/Error401"));
const Error404 = lazy(() => import("./pages/errors/404/Error404"));
const Admin = lazy(() => import("./pages/admin/default/Admin"));
const AdminUpdate = lazy(() => import("./pages/admin/products/update/default/AdminUpdate"));
const AdminUpdateSuccess = lazy(() => import("./pages/admin/products/update/success/AdminUpdateSuccess"));
const AdminUpdateOrder = lazy(() => import("./pages/admin/orders/update/AdminUpdateOrder"));
const AdminNewOrder = lazy(() => import("./pages/admin/orders/new/AdminNewOrder"));
const AdminOrders = lazy(() => import("./pages/admin/orders/default/AdminOrders"));
const AdminViewOrder = lazy(() => import("./pages/admin/orders/id/AdminViewOrder"));
const AdminNewProduct = lazy(() => import("./pages/admin/products/new/AdminNewProduct"));
const AdminShipping = lazy(() => import("./pages/admin/shipment/default/AdminShipping"));
const AdminUpdateShipping = lazy(() => import("./pages/admin/shipment/update/AdminUpdateShipping"));
const Products = lazy(() => import("./pages/products/Products"));
const Checkout = lazy(() => import("./pages/checkout/checkout"));
const Success = lazy(() => import("./pages/checkout/success"));
const ShipmentId = lazy(() => import("./pages/shipment/id/ShipmentId"));
const OrderId = lazy(() => import("./pages/order/id/OrderId"));
const Invoice = lazy(() => import("./components/invoice/Invoice"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Rating = lazy(() => import("./pages/rating/Rating"));
const ProductDetails = lazy(() => import("./pages/product-details/ProductDetails"));

const App = () => {
    const dispatch = useDispatch();
    const cartState = useSelector(state => state.cart.cart);
    const cart = useMemo(() => cartState || [], [cartState]);
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    useEffect(() => {
        const syncCart = async () => {
            if (user?.token) {
                await dispatch(cartActions.getCartAsync());
            } else {
                const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
                dispatch(cartActions.setCart(localCart));
            }
        }
        syncCart();
    }, [user, dispatch]);

    const addProductToCart = async (product) => {
        const productId = product.product_id || product.id;
        const qty = product.quantity || 1;
        
        if (product.remove) {
            if (user?.token) {
                await dispatch(cartActions.removeFromCartAsync(productId));
            } else {
                const newCart = cart.filter((cartItem) => cartItem.product_id !== productId);
                dispatch(cartActions.setCart(newCart));
                localStorage.setItem('cart', JSON.stringify(newCart));
            }
            return;
        }

        if (qty < 0) {
            const productInCart = cart.find(p => p.product_id === productId);
            if (!productInCart) return;
            
            if (productInCart.quantity + qty <= 0) {
                if (user?.token) {
                    await dispatch(cartActions.removeFromCartAsync(productId));
                } else {
                    const newCart = cart.filter((cartItem) => cartItem.product_id !== productId);
                    dispatch(cartActions.setCart(newCart));
                    localStorage.setItem('cart', JSON.stringify(newCart));
                }
            } else {
                if (user?.token) {
                    await dispatch(cartActions.updateCartItemAsync(productId, productInCart.quantity + qty));
                } else {
                    const newCart = cart.map(item => 
                        item.product_id === productId 
                            ? { ...item, quantity: item.quantity + qty }
                            : item
                    );
                    dispatch(cartActions.setCart(newCart));
                    localStorage.setItem('cart', JSON.stringify(newCart));
                }
            }
            return;
        }

        if (user?.token) {
            await dispatch(cartActions.addToCartAsync(productId, qty));
        } else {
            const productIndex = cart.findIndex((cartProduct) => cartProduct.product_id === productId);
            let newCart;
            if (productIndex >= 0) {
                const updatedData = { ...cart[productIndex], quantity: cart[productIndex].quantity + qty };
                const newArray = [...cart];
                newArray[productIndex] = updatedData;
                newCart = newArray;
            } else {
                newCart = [...cart, { ...product, product_id: productId, quantity: qty }];
            }
            dispatch(cartActions.setCart(newCart));
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }

    const removeProductFromCart = async (product) => {
        const productId = product.product_id || product.id;
        if (user?.token) {
            const productInCart = cart.find(p => p.product_id === productId);
            if (productInCart && productInCart.quantity > 1) {
                await dispatch(cartActions.updateCartItemAsync(productId, productInCart.quantity - 1));
            } else {
                await dispatch(cartActions.removeFromCartAsync(productId));
            }
        } else {
            const productIndex = cart.findIndex((cartProduct) => cartProduct.product_id === productId);

            if (productIndex === -1) return;

            let newCart;
            if (cart[productIndex].quantity === 1) {
                newCart = cart.filter((cartItem) => cartItem.product_id !== productId);
            } else {
                const updatedData = { ...cart[productIndex], quantity: cart[productIndex].quantity - 1 };
                const newArray = [...cart];
                newArray[productIndex] = updatedData;
                newCart = newArray;
            }
            dispatch(cartActions.setCart(newCart));
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }

    const updateQuantity = (product, operation) => {
        if (operation === 'ADD')
            return addProductToCart(product);

        if (operation === 'REMOVE')
            return removeProductFromCart(product)
    }

    const cartCount = useMemo(() => {
        return cart.reduce((total, cartElement) => total + cartElement.quantity, 0);
    }, [cart]);

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Navigation cartCount={cartCount} theme={theme} toggleTheme={toggleTheme} />
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/products'} element={<Products addProductToCart={addProductToCart} />} />
                    <Route path={'/product/:id'} element={<ProductDetails addProductToCart={addProductToCart} cart={cart} />} />
                    <Route path={'/cart'}
                        element={<CartPage cart={cart} cartCount={cartCount} updateQuantity={updateQuantity} />} />
                    <Route path={'/checkout'} element={<PrivateRoute component={<Checkout />} />} />
                    <Route path={'/checkout/success'} element={<Success />} />
                    <Route path={'/signup'} element={<Signup />} />
                    <Route path={'/contact'} element={<Contact />} />
                    <Route path={'/shipping'} element={<Shipment />} />
                    <Route path={'/shipping/:id'} element={<ShipmentId />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/forgot-password'} element={<ForgotPassword />} />
                    <Route path={'/reset-password'} element={<ResetPassword />} />
                    <Route path={'/orders'} element={<Order />} />
                    <Route path={'/orders/:id'} element={<OrderId />} />
                    <Route path={'/orders/:id/invoice'} element={<Invoice />} />
                    <Route path={'/rating/:orderId/:productId'} element={<PrivateRoute component={<Rating />} />} />
                    <Route path={'/wishlist'} element={<PrivateRoute component={<Wishlist addProductToCart={addProductToCart} />} />} />
                    <Route path={'/admin'} element={<PrivateRoute role={'ADMIN'} component={<Admin />} />} />
                    <Route path={'/admin/orders'}
                        element={<PrivateRoute role={'ADMIN'} component={<AdminOrders />} />} />
                    <Route path={'/admin/orders/update'}
                        element={<PrivateRoute role={'ADMIN'} component={<AdminUpdateOrder />} />} />
                    <Route path={'/admin/orders/new'}
                        element={<PrivateRoute role={'ADMIN'} component={<AdminNewOrder />} />} />
                    <Route path={'/admin/shipping'}
                        element={<PrivateRoute role={'ADMIN'} component={<AdminShipping />} />} />
                    <Route path={'/admin/shipping/update'}
                        element={<PrivateRoute role={'ADMIN'} component={<AdminUpdateShipping />} />} />
                    <Route path={'/admin/products/new'}
                        element={<PrivateRoute role={'ADMIN'} component={<AdminNewProduct />} />} />
                    <Route path={'/admin/products/update'}
                        element={<PrivateRoute role={'ADMIN'} component={<AdminUpdate />} />} />
                    <Route path={'/admin/products/update/success'}
                        element={<PrivateRoute role={'ADMIN'} component={<AdminUpdateSuccess />} />} />
                    <Route path={'/admin/orders/:id'}
                        element={<PrivateRoute role={'ADMIN'} component={<AdminViewOrder />} />} />
                    <Route path={'/401'} element={<Error401 />} />
                    <Route path={'/*'} element={<Error404 />} />
                </Routes>
            </Suspense>
            <Footer />
        </BrowserRouter>
    );
}

export default App;