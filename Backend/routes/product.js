const router = require('express').Router()
const {verifyTokenAndAdmin} = require('../routes/verifyToken')
const Product = require('../models/Product')
const verifyStatus = require('./verifyStatus')

//Creating

router.post('/', verifyTokenAndAdmin, async (req, res) => {
    let {title, description, author, publisher, publishedAt, img, category, chapter, price, offer } = req.body
    const chapters = chapter.split(',')
    const categories = category.split(',')
    const offers = offer.split(',')
    const newProduct = new Product({title, description, author, publisher, publishedAt, img, categories, chapters, price, offers })
    try {
        await newProduct.save()
        res.status(200).json({msg: 'Product added'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update product

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    let {title, description, author, publisher, publishedAt, img, category, chapter, price, offer } = req.body
    const chapters = chapter.split(',')
    const categories = category.split(',')
    const offers = offer.split(',')
    const newProduct = {title, description, author, publisher, publishedAt, img, categories, chapters, price, offers }
    try {
        await Product.findByIdAndUpdate(req.params.id, {
            $set: newProduct
        }, {new: true})
        res.status(200).json({msg: 'Product updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete product

router.delete('/:id', verifyTokenAndAdmin, async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get product

router.get('/find/:id', verifyStatus, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all products

router.get('/', verifyStatus, async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products
        if(qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(5)
        } else if(qCategory) {
            products = await Product.find({categories: {$in: [qCategory]}})
        } else {
            products = await Product.find()
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router