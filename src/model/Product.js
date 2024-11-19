import mongoose, { Schema } from "mongoose";
const tagSchema = new Schema({
  tagName: {
    type: String,
  },
});
const imgSchema = new Schema({
  imgName : {
    type: String,
  },
  imgUrl: {
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
  user: {
    type: mongoose.Schema.Types.ObjectId , 
    ref: "UserModel",
    required: [true, "User id is required"],
    required: true,
  },
});

const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default ProductModel;
