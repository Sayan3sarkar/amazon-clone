const express = require('express');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// App Config
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: true
}));

// Routes
app.get('/', (req, res)=> res.status(200).send('Hi'));

app.post('/payments/create', async (req, res)=>{

    const total = req.query.total;

    console.log('Payment Request recived for INR: ' + total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of currency
        currency: "inr",
    });
    
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    });
});


module.exports = app;