const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { reset } = require("nodemon")


// middlewares
app.use(cors())
app.use(express.json())

// routes
const productRoute = require('./routes/product.route')

app.get('/', (req, res) => {
    res.send("Route is working! YaY!")
})

// product api
app.use('/api/v1/product', productRoute)


module.exports = app