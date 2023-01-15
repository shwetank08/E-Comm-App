const mongoose = require("mongoose");
const authRole = require("../util/authRole");
const JWT = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { SECRET, EXPIRY } = process.env;
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      validate: [validator.isEmail, "please provide valid email"],
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
      default: authRole.USER,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function(next){
  if(!this.isModified("password")){
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

userSchema.methods = {
  getJwtToken: function () {
    return JWT.sign(
      {
        _id: this._id,
        role: this.role,
      },
      SECRET,
      {
        expiresIn: EXPIRY,
      }
    );
  },

  comparePassword: async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
  }
};

module.exports = mongoose.model("User", userSchema);
