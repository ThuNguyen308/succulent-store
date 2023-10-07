import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.ObjectId,
                ref: "Products",
            },
            buyQuantity: {
                type: Number,
            }
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "users"
    },
    status: {
        type: String,
        default: "Not process",
        enum: ["Not process", "Processing", "Shipped", "Delivered", "Cancel"]
    }
},
{timestamps: true}
)

export default mongoose.model('orders', orderSchema)