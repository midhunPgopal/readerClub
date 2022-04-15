const mongoose = require('mongoose')

const UserDetailsSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    proffession: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    wallet: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('UserDetails', UserDetailsSchema)