const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    product: {
        type: Object,
        required: true
    },
    chapter: {
        type: String,
        default: 1,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Cart', CartSchema)