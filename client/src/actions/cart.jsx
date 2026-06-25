import * as api from '../api';

export const setCart = (data) => ({
    type: 'SET_CART',
    data
});



export const getCartAsync = () => {
    return async (dispatch) => {
        try {
            const { data } = await api.fetchCart();
            dispatch(setCart(data.products));
            return data.products;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                window.location.href = '/login';
                return [];
            }
            console.log(error);
            return [];
        }
    }
}

export const addToCartAsync = (product_id, quantity) => {
    return async (dispatch) => {
        try {
            const { data } = await api.addToCart(product_id, quantity);
            dispatch(setCart(data.products));
            return data.products;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
                return;
            }
            console.log(error);
        }
    }
}

export const removeFromCartAsync = (product_id) => {
    return async (dispatch) => {
        try {
            const { data } = await api.removeFromCart(product_id);
            dispatch(setCart(data.products));
            return data.products;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
                return;
            }
            console.log(error);
        }
    }
}

export const updateCartItemAsync = (product_id, quantity) => {
    return async (dispatch) => {
        try {
            const { data } = await api.updateCartItem(product_id, quantity);
            dispatch(setCart(data.products));
            return data.products;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
                return;
            }
            console.log(error);
        }
    }
}