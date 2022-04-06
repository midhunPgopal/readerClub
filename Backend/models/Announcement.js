const mongoose = require('mongoose')

const AnnouncementSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Announcement', AnnouncementSchema)