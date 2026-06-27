import dotenv from 'dotenv';
dotenv.config();
import dns from 'dns';
dns.setServers(['8.8.8.8']);
import mongoose from 'mongoose';
import Order from './model/Orders.js';

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const order = await Order.findOne({ order_id: 'CWK553' }).lean();
        console.log("Full Order Document:", JSON.stringify(order, null, 2));

        await mongoose.connection.close();
    } catch (e) {
        console.error(e);
    }
};
run();
