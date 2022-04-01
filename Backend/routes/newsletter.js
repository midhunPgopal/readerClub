const router = require('express').Router()
const Newsletter = require('../models/Newsletter')

router.post('/', async (req, res) => {
    const {email} = req.body
    const newEmail = new Newsletter({email})
    try {
        const savedEmail = await newEmail.save()
        res.status(200).json({savedEmail})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router