const router = require('express').Router()
const {verifyTokenAndAdmin} = require('./verifyToken')
const Banner = require('../models/Banner')
const verifyStatus = require('./verifyStatus')

router.get('/', verifyStatus, async (req, res) => {
    try {
        const banner = await Banner.find()
        res.status(200).json(banner)
    } catch (error) {
        console.log(error);
    }
})

router.get('/find/:id', async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id)
        res.status(200).json(banner)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/get/:code', async (req, res) => {
    try {
        const data = await Banner.find({offerCode: req.params.code})
        const  [banner] = data
        res.status(200).json(banner)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
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

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Banner.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json({msg: 'Banner updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router