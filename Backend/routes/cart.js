const router = require('express').Router()
const { verifyToken, verifyTokenAndAdmin } = require('../routes/verifyToken')
const Cart = require('../models/Cart')
const verifyStatus = require('./verifyStatus')

//Creating

router.post('/', verifyToken, verifyStatus, async (req, res) => {
    let existingCart = null
    const existingProduct = await Cart.find({ productId: req.body.productId })
    const length = existingProduct.length
    for(let i=0;i<length; i++) {
        if(existingProduct[i].chapter == req.body.chapter) {
            existingCart = existingProduct[i]
            break;
        }
    }
    if (existingCart) { 
        try {
            const total = existingCart.quantity + req.body.quantity
            await Cart.findByIdAndUpdate(existingCart._id, {
                $set: { quantity : total }
            })
            res.status(200).json({ msg: 'Cart updated' })
        } catch (error) {
            console.log(error)
        }
    } else {
        const newCart = new Cart(req.body)
        try {
            await newCart.save()
            res.status(200).json({ msg: 'Item added to cart' })
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

//Update cart quantity

router.put('/quantity/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        await Cart.findByIdAndUpdate({ _id: req.params.id }, {
            $set: { 'quantity': req.body.productQuantity, 'total': req.body.total }
        })
        res.status(200).json({ msg: 'Cart updated' })
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete one cart entry

router.delete('/find/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        await Cart.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json('Cart deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete user cart

router.delete('/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        await Cart.deleteMany({ userId: req.params.id })
        res.status(200).json('User cart deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get cart

router.get('/find/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.params.id })
        res.status(200).json(cart)
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