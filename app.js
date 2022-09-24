const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { reset } = require("nodemon")


// middlewares
app.use(cors())
app.use(express.json())





// mongoose middleware for saving data : pre / post
productSchema.pre('save', function (next) {
    // this -->
    if (this.quantity == 0) {
        this.status = 'out-of-stock'
    }
    next()
})

// productSchema.post('save', function (doc, next) {
//     console.log('after saving data')
//     next()
// })

// for instance
productSchema.methods.logger = function () {
    console.log(`Data saved for ${this.name}`)
}






app.get('/', (req, res) => {
    res.send("Route is working! YaY!")
})

app.post('/api/v1/product')

app.get('/api/v1/product')

module.exports = app