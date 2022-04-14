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
            $set: req.body
        }, {new: true})
        res.status(200).json({msg: 'Address updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router