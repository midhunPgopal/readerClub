const router = require('express').Router()
const { verifyToken } = require('../routes/verifyToken')
const Wishlist = require('../models/Wishlist')
const Product = require('../models/Product')
const verifyStatus = require('./verifyStatus')

//Creating

router.post('/', verifyToken, verifyStatus, async (req, res) => {
    const existingList = await Wishlist.findOne({ productId: req.body.productId })
    if (existingList) {
        return res.status(200).json({ msg: 'Product already added' })
    } 
    const newWishlist = new Wishlist(req.body)
    try {
        await newWishlist.save()
        res.status(200).json({ msg: 'Added to wishlist' })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//Delete Wishlist

router.delete('/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        await Wishlist.deleteMany({ userId: req.params.id })
        res.status(200).json('Cart deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete one wishlist entry

router.delete('/find/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        await Wishlist.deleteOne({ productId: req.params.id })
        res.status(200).json('Cart deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get wishlist

router.get('/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        const product = await Wishlist.find({ userId: req.params.id })
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router