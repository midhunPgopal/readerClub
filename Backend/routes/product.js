const router = require('express').Router()
const { verifyTokenAndAdmin } = require('../routes/verifyToken')
const Product = require('../models/Product')

//Creating

router.post('/', verifyTokenAndAdmin, async (req, res) => {
    let { title, description, author, publisher, publishedAt, img, category, chapter, price, offer } = req.body
    const chapters = chapter.split(',')
    const categories = category.split(',')
    const offers = offer.split(',')
    const newProduct = new Product({ title, description, author, publisher, publishedAt, img, categories, chapters, price, offers })
    try {
        await newProduct.save()
        res.status(200).json({ msg: 'Product added' })
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update product

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    let { title, description, author, publisher, publishedAt, img, category, chapter, price, offer } = req.body
    const chapters = chapter.split(',')
    const categories = category.split(',')
    const offers = offer.split(',')
    const newProduct = { title, description, author, publisher, publishedAt, img, categories, chapters, price, offers }
    try {
        await Product.findByIdAndUpdate(req.params.id, {
            $set: newProduct
        }, { new: true })
        res.status(200).json({ msg: 'Product updated' })
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete product

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get product

router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all products

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/cat', async (req, res) => {
    const qCategory = req.query.category
    try {
        let products
        if (qCategory) {
            products = await Product.find({ categories: { $in: [qCategory] } })
        } else {
            products = await Product.find()
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/offer', async (req, res) => {
    const qOffer = req.query.offer
    try {
        let products
        if (qOffer) {
            products = await Product.find({ offers: { $in: [qOffer] } })
        } else {
            products = await Product.find()
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/search', async (req, res) => {
    const qSearch = req.query.search.trim()
    try {
        let product = null
        if (qSearch) {
            product = await Product.find({ $or: [ { title: { $regex: qSearch, $options: "i" } } ] })
        } else {
            product = await Product.find()
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router