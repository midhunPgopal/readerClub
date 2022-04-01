const router = require('express').Router()
const {verifyToken, verifyTokenAuth, verifyTokenAndAdmin} = require('../routes/verifyToken')
const Cart = require('../models/Cart')

//Creating

router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update cart

router.put('/:id', verifyTokenAuth, async (req, res) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updateCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete cart

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        await Cart.deleteMany({userId: req.params.id})
        res.status(200).json('Cart deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get cart

router.get('/find/:id', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.find({userId: req.params.id})
        res.status(200).json({cart})
    } catch (error) {
        console.log(error);
    }
})

//Get all

router.get('/', verifyTokenAndAdmin , async (req, res) => {
    try {
        const cart = await Cart.find()
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router