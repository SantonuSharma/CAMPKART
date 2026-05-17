import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  name: String,
  category: String,
  price: Number,
  username: String,
  address: String,
  contact_number: String,
  description: String,
  image: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000,
  },

});

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;