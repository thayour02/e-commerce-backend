const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const menuRoutes = require('./route/menus')
const cartRoutes = require('./route/cart')
const userRoutes = require('./route/user')
const jwt = require('jsonwebtoken')
const stripe = require("stripe")(process.env.STRIPE_KEY);
require('dotenv').config()

require('./db/database')


const app = express()
app.use(cors({
    origin:"http://localhost:5173", 
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    maxAge: 3600, // Optional, specifies CORS configuration cache duration
  }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const User = require('../server-side/model/user')

app.post("/jwt", async(req,res)=>{
  const user = req.body
  const email = req.body.email

  const token = jwt.sign(user,process.env.JWT_SECRET_KEY,{
    expiresIn:'1hr'
  })
  const users = await User.findOne({email:email})
  res.send({token,users})
})

app.use('/api', menuRoutes)
app.use('/api', cartRoutes)
app.use('/api', userRoutes)


// stripe payment route
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price*100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",

    payment_method_types:["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    // dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
});



const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`app is running on ${port}`)
})