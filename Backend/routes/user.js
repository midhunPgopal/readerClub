const router = require('express').Router()
const { verifyTokenAndAdmin } = require('../routes/verifyToken')
const User = require('../models/User')

//update userdetails

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await User.findByIdAndUpdate({_id: req.params.id}, {
            $set: {'name': req.body.name, 'email': req.body.email, 'mobile': req.body.mobile}
        })
        res.status(200).json({msg:'User updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//update user status

router.put('/status/:id',verifyTokenAndAdmin, async (req, res) => {
    try {
        await User.findByIdAndUpdate({_id: req.params.id}, {
            $set: {'status': req.body.status}
        })
        res.status(200).json({msg:'User blocked'})
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get user

router.get('/find/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get all user

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get user status

router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1))
    try {
        const data = await User.aggregate([
            {
                $match: {createdAt: {$gte : lastYear}}
            },
            {
                $project: {month: {$month:'$createdAt'}}
            },
            {
                $group: {_id: '$month', total: {$sum: 1}}
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router