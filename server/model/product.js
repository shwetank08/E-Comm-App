const mongoose = require("mongoose");
const Categories = require("../util/categories");

const product = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: [120, "Product name should not be more than 120 characters"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      maxLength: [6, "Price can not be more than 6 digits"],
    },
    stock: {
      type: Number,
      required: true,
    },
    photos: {
      id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      enum: Object.values(Categories),
      default: Categories.TShirt,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", product);
