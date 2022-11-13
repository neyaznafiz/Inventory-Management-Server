const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
    console.log(data);
    const result = await Brand.create(data);
    return result;
  }
