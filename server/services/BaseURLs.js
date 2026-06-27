const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 5001;

export const WEBSITE_BASE_URL = isProduction ? 'https://grocerapp.vercel.app' : `http://localhost:3000`;
export const PRODUCTS_BASEURL = isProduction ? 'https://grocerapp-products.vercel.app/products' : `http://localhost:${PORT}/api/products`;
export const ORDERS_BASEURL = isProduction ? 'https://grocerapp-orders.vercel.app/orders' : `http://localhost:${PORT}/api/orders`;
export const SHIPPING_BASEURL = isProduction ? 'https://grocerapp-shipping.vercel.app/shipping' : `http://localhost:${PORT}/api/shipping`;
export const NOTIFICATIONS_BASEURL = isProduction ? 'https://grocerapp-notifications.vercel.app/notifications' : `http://localhost:${PORT}/api/notifications`;
