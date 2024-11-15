import mongoose, { Schema } from "mongoose";
const tagSchema = new Schema({
  content: {
    type: String,
  },
});
const imgSchema = new Schema({
  content: {
    type: String,
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
  images: [imgSchema],
});

const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default ProductModel;
