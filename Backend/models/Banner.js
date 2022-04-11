const mongoose = require('mongoose')

const BannerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    offerDescription: {
        type: String,
        required: true
    },
    offerCode: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    bg: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Banner', BannerSchema)

