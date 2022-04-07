const router = require('express').Router()
const {verifyToken} = require('../routes/verifyToken')
const PreOrder = require('../models/PreOrder')
const verifyStatus = require('../routes/verifyStatus')

router.get('/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        const preOrders = await PreOrder.find({UserId: req.params.id})
        res.status(200).json(preOrders)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post('/', verifyToken, async (req, res) => {
    const newPreOrder = new PreOrder(req.body)
    try {
        await newPreOrder.save()
        res.status(200).json({msg:'Pre-order saved'})
    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await PreOrder.deleteMany({UserId: req.params.id})
        res.status(200).json({msg:'deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router