const Product = require("../models/Product");

// service for get product
exports.getProductServices = async (filters, queries) => {
  // const products = await Product.find(query);

  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  //  const products = await Product.findById("632202931d18e539d4f2f4d7")
  // const products = await Product.find({$or: [{_id: "632202931d18e539d4f2f4d7"}, {name:"chal"}]})
  // const products = await Product.find({ status: { $ne: "out-of-stock" } })
  // const products = await Product
  //     .where("name").equals(/\w/)
  //     .where("quantity").gt(100).lt(600)
  //     .limit(2).sort({ quantity: -1 })

  return { totalProducts, pageCount, products };
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
  // bulk update with same value for all
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {runValidators: true});

  // bulk update with different value for all
  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);

  return result;
};

// delete product
exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });

  return result;
};

// bulk delete
exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });

  return result;
};
