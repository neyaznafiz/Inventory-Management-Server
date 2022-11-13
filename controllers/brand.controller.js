const { createBrandService } = require("../services/brand.services");

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
