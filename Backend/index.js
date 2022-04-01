const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productsRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const ordersRoute = require('./routes/order')
const newsletterRoute = require('./routes/newsletter')
const cors = require('cors')
const bodyParser = require('body-parser')

dotenv.config() 

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('Database connected successfully'))
    .catch(err => console.log(err))

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
 
app.use('/api/auth', authRoute)
app.use('/api/users' , userRoute)
app.use('/api/products', productsRoute)
app.use('/api/cart', cartRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/newsletter', newsletterRoute)

app.listen(process.env.PORT || 5000, () => console.log(`Server running on ${process.env.PORT}`))