const mongoose = require('mongoose')

const PreOrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    grandTotal: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('PreOrder', PreOrderSchema)