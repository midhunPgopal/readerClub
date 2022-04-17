const router = require('express').Router()
const { verifyTokenAndAdmin} = require('./verifyToken')
const Order = require('../models/Order')
const verifyStatus = require('./verifyStatus')
const Razorpay = require('razorpay')
const shortid = require('shortid')

//Creating

router.post('/',  verifyStatus, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        await newOrder.save()
        res.status(200).json({msg: 'Order created'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update order

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

//cancel order

router.put('/cancel/:id', verifyStatus, async (req, res) => {
    try {
        await Order.findByIdAndUpdate({_id: req.params.id}, {
            $set: {'status':'Cancelled'}
        })
        res.status(200).json({msg: 'Order cancelled'})
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

router.get('/findusercart/:id',  verifyStatus, async (req, res) => {
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

//razorpay

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})

router.post('/razorpay', verifyStatus, async (req, res) => {
    const payment_capture = 1
    const currency = 'INR'

    const options = {
        amount: req.body.total * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try {
        const response = await razorpay.orders.create(options)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }

})
router.post('/verify', async (req, res) => {
    try {
        const secret = '12345678'

        const shasum = crypto.createHmac('sha256', secret)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest('hex')

        //console.log(digest, req.headers['x-razorpay-signature'])

        if (digest === req.headers['x-razorpay-signature']) {
            //console.log('request is legit')
            // process it
            require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
        } else {
            // pass it
        }
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


module.exports = router