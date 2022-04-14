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
    image: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('UserDetails', UserDetailsSchema)