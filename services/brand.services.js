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

// update singe brand by id service 
exports.updateSingleBrandService = async (id, data) => {
    const result = await Brand.updateOne({ _id: id }, data, {runValidators: true});
  return result;
}

// create brand service
exports.createBrandService = async (data) => {
  console.log(data);
  const result = await Brand.create(data);
  return result;
};
