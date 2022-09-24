const Product = require('../models/Product');

// product get controller
exports.getProduct = async (req, res, next) => {
    try {

        const product = await Product.findById("632202931d18e539d4f2f4d7") 
        // const products = await Product.find({$or: [{_id: "632202931d18e539d4f2f4d7"}, {name:"chal"}]})
        // const products = await Product.find({ status: { $ne: "out-of-stock" } })
        // const products = await Product
        //     .where("name").equals(/\w/)
        //     .where("quantity").gt(100).lt(600)
        //     .limit(2).sort({ quantity: -1 })

        res.status(200).json({ status: "success", data: product })
    }
    catch (error) {
        res.status(400).send({
            status: "fail",
            message: "Can't get the data!!",
            error: error.message
        })
    }
}


// product post controller
exports.createProducct = async (req, res, next) => {
    //    save or create
    try {
        // for save method
        // const product = new Product(req.body)

        // instance creation --> do something --> save()

        // if (product.quantity == 0) {
        //     product.status = 'out-of-stock'
        // }
        // const result = await product.save()


        // for create method
        const result = await Product.create(req.body)

        result.logger()

        res.status(200).send({ status: 'successful', message: 'Product inserted successfully!', data: result })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: 'data is not inserted',
            error: error.message
        })
    }
}