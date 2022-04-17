const router = require('express').Router()
const UserDetails = require('../models/UserDetails')
const verifyStatus = require('./verifyStatus')

router.get('/:id',  async (req, res) => {
    try {
        const userDetails = await UserDetails.find({userId: req.params.id})
        res.status(200).json(userDetails)
    } catch (error) {
        console.log(error)
    }
}) 

router.post('/',  verifyStatus, async (req, res) => {
    const newUserDetails = new UserDetails(req.body)
    try {
        await newUserDetails.save()
        res.status(200).json({msg: 'UserDetails created'})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id',  verifyStatus, async (req, res) => {
    try {
        await UserDetails.findOneAndUpdate({userId: req.params.id}, {
            $set: req.body
        }, {new: true})
        res.status(200).json({msg: 'UserDetails updated'})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router