const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const helmet = require("helmet");
const ExpressRateLimit = require('express-rate-limit');
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const path = require('path');
const router = require("./src/Router/RouterApi");


const app = express();
let limiter = ExpressRateLimit({windowMs: 5 * 60 * 1000, limit: 2000, standardHeaders: 'draft-7',})

// Security middlewares

app.use(cors({
    origin: true,
    credentials: true,
}));


app.use(helmet())
app.use(hpp());
app.use(cookieParser())
app.use(express.json({limit: "100mb"}));
app.use(express.urlencoded({extended: true}))
app.use(limiter)

// Web cache validation and conditional requests in Http
app.set('etag', false);

//data Base
const URL = "mongodb://127.0.0.1:27017/MernEcommerce";
const option = {user: "", pass: "", autoIndex: true};
mongoose.connect(URL, option).then(() => {
    console.log(`mongodb://127.0.0.1:27017/MernEcommerce`);
}).catch((err) => {
    console.log(err);
});


// Router Api

app.use('/api/v1', router);


//proxing server

app.use(express.static('client/dist'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
});


module.exports = app;
