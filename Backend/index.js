const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const usereRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productsRoute = require('./routes/product')

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('Database connected successfully'))
    .catch(err => console.log(err))

app.use(express.json())

app.use('/api/user' , usereRoute)
app.use('/api/auth', authRoute)
app.use('/api/products', productsRoute)

app.listen(process.env.PORT || 5000, () => console.log(`Server running on ${process.env.PORT}`))