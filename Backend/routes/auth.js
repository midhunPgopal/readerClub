const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

const serviceSID = 'VA674a5cb041f704dc5cb323e17f4ca26a'
const accountSId = 'ACab518c4ccc6928c55583f8d2f5ca1543'
const authToken = '2cdff94e273663d6dce2c781ff88c2dc'

const client = require('twilio')(accountSId, authToken)

//for register

router.post('/register', async (req, res) => {
    let { name, username, email, mobile, password, cpassword } = req.body
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    const valid = emailRegex.test(email)
    //validation
    if (!name || !username || !email || !mobile || !password || !cpassword) {
        return res.status(400).json({ msg: 'Input fields are empty' })
    }
    if (!valid) {
        return res.status(400).json({ msg: 'Email not valid' })
    }
    if (password.length < 3) {
        return res.status(400).json({ msg: 'Password weak' })
    }
    if (password !== cpassword) {
        return res.status(400).json({ msg: 'Password doesnt match' })
    }
    if (mobile.length < 10 || mobile.length > 10) {
        return res.status(400).json({ msg: 'Mobile number should be 10 digits' })
    }
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' })
    }
    const newUser = new User({
        name,
        username,
        email,
        mobile,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    })
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        console.log(error);
    }
})

//for login

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        if (!username) {
            return res.status(400).json({ msg: 'Input fields are empty' })
        }
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(400).json({ msg: 'User not found' })
        }
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        )
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        if (originalPassword !== req.body.password) {
            return res.status(400).json({ msg: 'Password incorrect' })
        }
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({ user, accessToken })
    } catch (error) {
        console.log(error);
    }
})

router.post('/otplogin', async (req, res) => {
    try {
        const { mobile } = req.body
        if (mobile.length > 10 || mobile.length < 10) {
            res.status(401).json({ msg: 'Mobile number should be 10 digits' })
        }
        const user = await User.findOne({ mobile })
        !user && res.status(401).json({ msg: 'User doesnt found' })
        client.verify.services(serviceSID)
            .verifications.create({
                to: `+91${req.body.mobile}`,
                channel: 'sms'
            })
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
})

router.post('/otpverify', async (req, res) => {
    const { number, otp } = req.body
    const user = await User.findOne({ mobile: number })
    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, { expiresIn: '1d' })
    client.verify.services(serviceSID)
        .verificationChecks.create({
            to: `+91${number}`,
            code: otp
        }).then(resp => {
            res.status(200).json({ user, accessToken })
        }).catch(err => console.log(err))
})

module.exports = router