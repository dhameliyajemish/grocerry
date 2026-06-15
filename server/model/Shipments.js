import mongoose from "mongoose";

const { Schema } = mongoose;

const ShipmentsSchema = new Schema({
    order_id: { type: String, unique: true, required: true },
    total: Number,
    address: Object,
    phone_number: String,
    status: { 
        type: String, 
        enum: ['CREATED', 'PROCESSING', 'PACKED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'RETURNED', 'CANCELLED'], 
        default: "CREATED" 
    },
    ordered_at: Date
});

const Shipments = mongoose.model('Shipments', ShipmentsSchema);
export default Shipments;