const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },

    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique."],
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [30, "Name is too large, set a name under 30 characters."],
    },

    description: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["bag", "kg", "litre", "pcs"],
        message: "Unit value can't be {VALUE}, it must be bag/kg/litre/pcs",
      },
    },

    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: "Please provide valid image URLs..!",
        },
      },
    ],

    price: {
      type: Number,
      required: true,
      min: [0, "Product price can't be negative..!"],
    },

    quantity: {
      type: Number,
      required: true,
      min: [0, "Product quantity can't be negative..!"],
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status can't be {VALUE} ..!",
      },
    },

    store: {
      name: {
        type: String,
        trim: true,
        require: [true, "Please provide a store name..!"],
        lowercase: true,
        enum: {
          values: [
            "dhaka",
            "chattogram",
            "rajshahi",
            "sylhet",
            "khulna",
            "barishal",
            "rangpur",
            "mymensingh",
          ],
          message: "{VALUE} is not a valid name..!",
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },

    suppliedBy: {
      name: {
        type: String,
        trim: true,
        require: [true, "Please provide a supplier name..!"],
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
  },
  { timestamps: true }
);

stockSchema.pre("save", function (next) {
  // this -->
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
