const router = require('express').Router()
const ReferralCode = require('../models/ReferralCode')

router.get('/:id', async (req, res) => {
    try {
        const announcement = await ReferralCode.findOne({referalCode: req.params.id})
        res.status(200).json(announcement)
    } catch (error) {
        console.log(error);
    }
})



module.exports = router