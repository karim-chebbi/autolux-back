const mongoose = require('mongoose')

const Schema = mongoose.Schema


const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: Number,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true },
  { collection: "users" }
);

module.exports = User = mongoose.model("User", UserSchema);