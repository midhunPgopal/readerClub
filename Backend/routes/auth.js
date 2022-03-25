const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//for register

router.post('/register', async (req, res) => {
    let {name, username, email, password, cpassword } = req.body
    //validation
    if(!name || !username || !email || !password || !cpassword){
        return res.status(400).jsonerror('Input fields are empty')
    }
    if(password.length<3){
        return res.status(400).json('Weak passsword')
    }
    if(password !== cpassword){
        return res.status(400).json("Passwords doesnt match")
    }
    const existingUser = await User.findOne({email:email})
    if(existingUser) {
        return res.status(400).json('User already exists')
    }
    const newUser = new User({
        name,
        username,
        email,
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
    try {
        const user = await User.findOne({username: req.body.username,})
        !user && res.status(401).json('Wrong credentials')
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        )
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        originalPassword !== req.body.password && res.status(401).json('wrong password')
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin : user.isAdmin
        }, 
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
        )
        const {password, ...others} = user._doc
        res.status(200).json({...others, accessToken})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router