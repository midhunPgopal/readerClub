const mongoose = require('mongoose')

const AddressSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    landmark: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Address', AddressSchema) 