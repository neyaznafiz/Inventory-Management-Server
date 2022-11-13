const {
  createBrandService,
  getBrandsService,
} = require("../services/brand.services");

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandsService(req.body);

    res.status(200).json({
      status: "success",
      message: "Brands get successfully!!",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get brands..!",
      error: error.message,
    });
  }
};

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);

    res.status(200).json({
      status: "success",
      message: "The brand created successfully!!",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the brand..!",
      error: error.message,
    });
  }
};
