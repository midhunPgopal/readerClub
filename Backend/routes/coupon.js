const router = require('express').Router()
const Coupon = require('../models/Coupon')
const {verifyTokenAndAdmin} = require('../routes/verifyToken')

router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const coupon = new Coupon(req.body)
    try {
        await coupon.save()
        res.status(200).json({msg:'Coupon saved'})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const coupon = await Coupon.find()
        res.status(200).json(coupon)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/check/:id', async (req, res) => {
    try {
        const coupon = await Coupon.findOne({couponCode: req.params.id})
        if(!coupon) {
            return res.status(500).json({coupon:'Coupon doesnt found'})
        }
        const result = coupon.users.includes(req.headers.userid)
        if(result) {
            return res.status(500).json({coupon:'Coupon already used'})
        }
        res.status(200).json(coupon)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Coupon.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json({msg:'Coupon updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/add/:id', async (req, res) => {
    try {
        const coupon = await Coupon.find({couponCode: req.params.id})
        const [data] = coupon
        const userList = data.users
        userList.push(req.body.userId)
        await Coupon.findOneAndUpdate({couponCode: req.params.id}, {
            $set: {users: userList}
        })
        res.status(200).json({msg:'Coupon updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id)
        res.status(200).json({msg:'Coupon deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router