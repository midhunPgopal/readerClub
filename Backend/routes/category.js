const router = require('express').Router()
const Category = require('../models/Category')
const {verifyTokenAndAdmin} = require('../routes/verifyToken')

router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const category = new Category(req.body)
    try {
        await category.save()
        res.status(200).json({msg:'category saved'})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const category = await Category.find()
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/find/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json({msg:'Category updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Category.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({msg:'Category deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router