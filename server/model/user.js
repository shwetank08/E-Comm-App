const mongoose = require("mongoose");
const authRole = require("../util/authRole");
const user = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "password must be at least 8 characters"],
      trim: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(authRole),
      default: authRole.user,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", user);
