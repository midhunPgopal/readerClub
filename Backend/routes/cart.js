const router = require('express').Router()
const {verifyToken, verifyTokenAndAdmin} = require('../routes/verifyToken')
const Cart = require('../models/Cart')
const verifyStatus = require('./verifyStatus')

//Creating

router.post('/', verifyToken, verifyStatus, async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        await newCart.save()
        res.status(200).json({msg:'Cart saved'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update cart

router.put('/quantity/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        await Cart.findByIdAndUpdate({_id: req.params.id}, {
            $set: {'quantity': req.body.productQuantity, 'total': req.body.total}
        })
        res.status(200).json({msg: 'Cart updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete one cart entry

router.delete('/find/:id', verifyToken, verifyStatus, async(req, res) => {
    try {
        await Cart.findByIdAndDelete({_id: req.params.id})
        res.status(200).json('Cart deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get cart

router.get('/find/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        const cart = await Cart.find({userId: req.params.id})
        res.status(200).json({cart})
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const cart = await Cart.find()
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router