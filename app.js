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

app.post('/api/v1/product', async (req, res, next) => {
    //    save or create
    try {
        // for save method
        const product = new Product(req.body)

        // instance creation --> do something --> save()
        // if (product.quantity == 0) {
        //     product.status = 'out-of-stock'
        // }
        const result = await product.save()

        result.logger()

        // for create method
        // const result = await Product.create(req.body)

        res.status(200).send({ status: 'successful', message: 'Product inserted successfully!', data: result })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: 'data is not inserted',
            error: error.message
        })
    }
})

app.get('/api/v1/product', async (req, res, next) => {
    try {
        // const products = await Product.find({$or: [{_id: "632202931d18e539d4f2f4d7"}, {name:"chal"}]})
        const products = await Product.find({ status: {$ne: "out-of-stock" }})
        res.status(200).json({ status: "success", data: products })
    }
    catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Can't get the data!!",
            error: error.message
        })
    }
})

module.exports = app