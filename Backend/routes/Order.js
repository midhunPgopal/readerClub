const router = require('express').Router()
const {verifyToken, verifyTokenAndAdmin} = require('./verifyToken')
const Order = require('../models/Order')
const verifyStatus = require('./verifyStatus')

//Creating

router.post('/', verifyToken, verifyStatus, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        await newOrder.save()
        res.status(200).json({msg: 'Order created'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update cart

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, {
            $set:{ 'deliveryAddress': req.body.deliveryAddress , 'status' : req.body.status }
        }) 
        res.status(200).json({msg: 'Order updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//cancel cart

router.put('/cancel/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, {
            $set: {'status':'Cancelled'}
        })
        res.status(200).json({msg: 'Order cancelled'})
    } catch (error) {
        res.status(500).json(error)
    }
})


//Delete oder

router.delete('/:id', verifyTokenAndAdmin, async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get single order for Admin

router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find({_id: req.params.id})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})
//Get single order for User

router.get('/findusercart/:id', verifyToken, verifyStatus, async (req, res) => {
    try {
        const orders = await Order.find({userId: req.params.id})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all 

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get monthly income

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth()-1))
    try {
        const income = await Order.aggregate([
            {
                $match: {createdAt: {$gte: previousMonth}}
            },
            {
                $project: {month: {$month: '$createdAt'},
                          sales: '$amount'}
            },
            {
                $group:{_id: '$month', total: {$sum: '$sales'}}
            }
        ])
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router