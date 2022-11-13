const Brand = require("../models/Brand");

// get brand service
exports.getBrandsService = async () => {
    const brands = await Brand.find({}).select('-products -suppliers')
    return brands
}

// create brand service
exports.createBrandService = async (data) => {
    console.log(data);
    const result = await Brand.create(data);
    return result;
  }
