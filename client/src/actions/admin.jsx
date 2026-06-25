import * as api from '../api';
import { DASHBOARD_STATS } from "../constants/actions/admin";

/**
 * Fetch Dashboard Statistics
 */
export const fetchDashboardStats = (onSuccess, onError) => async (dispatch) => {
    try {
        const { data } = await api.getDashboardStats();
        dispatch({ type: DASHBOARD_STATS, data });
        onSuccess(data);
    } catch (e) {
        console.error("Dashboard Stats Error:", e);
        onError(e.response?.data || e);
    }
};


/**
 * Create Order (Admin)
 */
export const createOrderAdmin = (orderData, onSuccess, onError) => async () => {
    try {
        const { data } = await api.createOrderAdmin(orderData);
        onSuccess(data);
    } catch (e) {
        onError(e.response?.data || e);
    }
};
