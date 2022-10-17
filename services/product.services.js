const Product = require("../models/Product");

// service for get product
exports.getProductServices = async (limit) => {
  const products = await Product.find({}).limit(+limit);
  //  const products = await Product.findById("632202931d18e539d4f2f4d7")
  // const products = await Product.find({$or: [{_id: "632202931d18e539d4f2f4d7"}, {name:"chal"}]})
  // const products = await Product.find({ status: { $ne: "out-of-stock" } })
  // const products = await Product
  //     .where("name").equals(/\w/)
  //     .where("quantity").gt(100).lt(600)
  //     .limit(2).sort({ quantity: -1 })

  return products;
};

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
  const product = await Product.create(data);

  return product;
};

// product update by id
exports.updateProductService = async (productId, data) => {
  const updateProductResult = await Product.updateOne(
    { _id: productId },
    { $set: data },
    { runValidators: true }
  );

  // we can use this $inc method for how much we incriment the value
  // const updateProductResult = await Product.updateOne(
  //   { _id: productId },
  //   { $inc: data },
  //   { runValidators: true }
  // );

  // it's a old update method
  // const product = await Product.findById(productId)
  // const updateProductResult = await product.set(data).save()

  return updateProductResult;
};

// product bulk update
exports.bulkUpdateProductService = async (data) => {
  const result = await Product.updateMany({ _id: data.ids }, data.data, {runValidators: true});

  return result;
};