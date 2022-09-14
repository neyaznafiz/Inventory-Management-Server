const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { reset } = require("nodemon")


// middlewares
app.use(cors())
app.use(express.json())


// SCHEMA --> MODEL --> QUERY
// product schema design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true,
        unique: [true, "Name must be unique."],
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [30, "Name is too large, set a name under 30 characters."]
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative."]
    },

    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "Unit value can't be {VALUE}, it must be kg/litre/pcs"
        }
    },

    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative."],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value)
                if (isInteger) {
                    return true
                }
                else {
                    return false
                }
            }
        },
        message: "Quantity must be a number."
    },

    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be {VALUE}, it can be in-stock/out-of-stock/discontinued"
        }
    },

    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },

    // categories: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]

    // createdAt:{
    //     type: Date,
    //     default: Date.now
    // },

    // updatedAt:{
    //     type: Date,
    //     default: Date.now
    // },
}, { timestamps: true })


// Model
const Product = mongoose.model('Product', productSchema)



app.get('/', (req, res) => {
    res.send("Route is working! YaY!")
})

app.post('/api/v1/product', async (req, res, next) => {
    //    save or create
    try {
        // for save method
        // const product = new Product(req.body)
        // const result = await product.save()

        // for create method
        const result = await Product.create(req.body)

        res.status(200).send({ status: 'successful', message: 'Product inserted successfully!', data: result })
    } catch (error) {
        res.status(400).send({ status: 'fail', message: 'data is not inserted' })
        error: error.message
    }
})

module.exports = app