const router = require('express').Router()
const {verifyToken, verifyTokenAndAdmin} = require('./verifyToken')
const Banner = requie('../models/Banner')
const verifyStatus = require('./verifyStatus')

router.get('/', verifyToken, verifyStatus, async (req, res) => {
    try {
        const banner = await Banner.find()
        res.status(200).json(banner)
    } catch (error) {
        console.log(error);
    }
})

router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newBanner = new Banner(req.body)
    try {
        await newBanner.save()
        res.status(200).json({msg: 'Banner created'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router