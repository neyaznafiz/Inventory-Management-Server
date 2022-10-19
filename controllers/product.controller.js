const {
  getProductServices,
  postProductServices,
  updateProductService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services");

// product get controller
exports.getProduct = async (req, res, next) => {
  try {
    // {price:{$gt:50}}
    console.log(req.query);

    let filters = { ...req.query };

    // sort, page, limit --> exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    // for filter
    // gt, lt, gte, lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    // for queries
    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      // console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      // console.log(fields)
    }

    const products = await getProductServices(filters, queries);

    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Can't get the data!!",
      error: error.message,
    });
  }
};

// product post controller
exports.createProduct = async (req, res, next) => {
  //    save or create
  try {
    const result = await postProductServices(req.body);

    result.logger();

    res.status(200).send({
      status: "successful",
      message: "Product inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "data is not inserted",
      error: error.message,
    });
  }
};

// product updateOne with patch controller
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);

    res.status(200).send({
      status: "successful",
      message: "Successfully updated the product.",
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Couldn't update the product.",
      error: error.message,
    });
  }
};

// bulk update
exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);

    res.status(200).send({
      status: "successful",
      message: "Successfully updated the product.",
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Couldn't update the product.",
      error: error.message,
    });
  }
};

// delete single product by id
exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);
    if (!result.deletedCount) {
      res.status(400).send({
        status: "fail",
        error: "Couldn't found the product. for delete",
      });
    }

    res.status(200).send({
      status: "successful",
      message: "Successfully delete the product.",
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Couldn't delete the product.",
      error: error.message,
    });
  }
};

// bulk delete
exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);

    res.status(200).send({
      status: "successful",
      message: "Successfully delete the product.",
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Couldn't delete the product.",
      error: error.message,
    });
  }
};
