import mongoose, { Schema } from "mongoose";
const tagSchema = new Schema({
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const ProductSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    unique: true,
  },
  productDescription: {
    type: String,
    required: [true, "Product Description is required"],
    trim: true,
  },
  tags: [tagSchema],
});

const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default ProductModel;
