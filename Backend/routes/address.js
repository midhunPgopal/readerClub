const router = require('express').Router()
const {verifyToken} = require('./verifyToken')
const Address = require('../models/Address')
const verifyStatus = require('./verifyStatus')

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const address = await Address.find({userId: req.params.id})
        res.status(200).json(address)
    } catch (error) {
        console.log(error)
    }
})
router.get('/find/:id', async (req, res) => {
    try {
        const address = await Address.findById(req.params.id)
        res.status(200).json(address)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', verifyToken, verifyStatus, async (req, res) => {
    const newAddress = new Address(req.body)
    try {
        await newAddress.save()
        res.status(200).json({msg: 'Address created'})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        await Address.findByIdAndUpdate(req.params.id, {
            $set: { 'address': req.body.address, 'pincode': req.body.pinode, 'landmark': req.body.landmark}
        })
        res.status(200).json({msg: 'Address updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete('/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        await Address.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: 'Address deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router