const {
  getBrandsService,
  getBrandByIdService,
  createBrandService,
} = require("../services/brand.services");

// get all brand controller
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

// get brand by id controller
exports.getBrandById = async (req, res, next) => {
    const {id} = req.params
    try {
        const brand = await getBrandByIdService(id);

        if (!brand) {
            res.status(400).json({
                status: "fail",
                message: "Couldn't find the brand with this id..!",
                error: error.message,
              });
        }
    
        res.status(200).json({
          status: "success",
          message: "Got the brands successfully!!",
          data: brand,
        });
      } catch (error) {
        res.status(400).json({
          status: "fail",
          message: "Couldn't get the brand..!",
          error: error.message,
        });
      }
};

// create/post brand controller
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
