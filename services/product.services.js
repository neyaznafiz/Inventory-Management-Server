const Product = require('../models/Product');

// service for get product
exports.getProductServices = async () => {

    const products = await Product.find({})
    //  const products = await Product.findById("632202931d18e539d4f2f4d7") 
    // const products = await Product.find({$or: [{_id: "632202931d18e539d4f2f4d7"}, {name:"chal"}]})
    // const products = await Product.find({ status: { $ne: "out-of-stock" } })
    // const products = await Product
    //     .where("name").equals(/\w/)
    //     .where("quantity").gt(100).lt(600)
    //     .limit(2).sort({ quantity: -1 })

    return products
}

// service for post product
exports.postProductServices = async (data) => {
    
    // for save method
    // const product = new Product(req.body)
    
    // instance creation --> do something --> save()
    
    // if (product.quantity == 0) {
        //     product.status = 'out-of-stock'
        // }
        // const result = await product.save()
        
        
        // for create method
        const product = await Product.create(data)

    return product
}