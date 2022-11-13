const Brand = require("../models/Brand");

// get brand service
exports.getBrandsService = async () => {
  const brands = await Brand.find({}).select("-products -suppliers");
  return brands;
};

// get brand by id service
exports.getBrandByIdService = async (id) => {
  const brand = await Brand.findOne({ _id: id });
  return brand;
};

// create brand service
exports.createBrandService = async (data) => {
  console.log(data);
  const result = await Brand.create(data);
  return result;
};
