const mongoose = require('mongoose');

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


// SCHEMA --> MODEL --> QUERY
// Model
const Product = mongoose.model('Product', productSchema)


module.exports = Product