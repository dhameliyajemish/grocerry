import dotenv from 'dotenv';
dotenv.config();
import dns from 'dns';
dns.setServers(['8.8.8.8']);
import mongoose from 'mongoose';
import Order from './model/Orders.js';

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const orders = await Order.find().sort({ ordered_at: -1 }).limit(10).lean();
        console.log(`\n--- RECENT 10 ORDERS ---`);
        orders.forEach(o => {
            console.log(`Order ID: ${o.order_id} | Customer: ${o.name?.first} ${o.name?.last} | Total: ${o.total} | Products Count: ${o.products?.length || 0} | Date: ${o.ordered_at}`);
        });
        await mongoose.connection.close();
    } catch (e) {
        console.error(e);
    }
};
run();
