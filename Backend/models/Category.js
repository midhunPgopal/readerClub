const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    offer: {
        tyoe: String
    },
    discount: {
        type: Number
    }
})

module.exports = mongoose.model('Category', CategorySchema)