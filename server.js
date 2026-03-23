require('dotenv').config()
const express = require('express')
const cookieparser = require('cookie-parser')
const app = express();

app.use(express.json())

//db
const db = require('./db')
db()

const cors = require('cors')
app.use(cors())

app.use(cookieparser())

//routes
const authroute = require('./routes/auth')
const gigsroute = require('./routes/gigs')
const bidsroute = require('./routes/bids')
app.use('/api/auth',authroute)
app.use('/api/gigs',gigsroute)
app.use('/api/bids',bidsroute)

const port = process.env.PORT
app.listen(port,()=>{
    console.log('server is running 🚀')
})