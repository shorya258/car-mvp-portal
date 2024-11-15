import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/model/Product";
import { NextResponse } from "next/server";
export async function PUT(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { productDetails } = body;
    if (!productDetails || !productDetails._id) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }
    if (productDetails.tags && !Array.isArray(productDetails.tags)) {
      return NextResponse.json(
        {
          success: false,
          message: "Tags must be an array",
        },
        { status: 400 }
      );
    }
    if (productDetails.images && !Array.isArray(productDetails.images)) {
      return NextResponse.json(
        {
          success: false,
          message: "Images must be an array",
        },
        { status: 400 }
      );
    }
    const productId = productDetails._id;
    await ProductModel.findByIdAndUpdate(
      productId,
      { $set: productDetails },
      { runValidators: true, new: true }
    );
    return NextResponse.json(
      {
        success: true,
        message: "Updated product successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Problem creating product.",
      },
      { status: 500 }
    );
  }
}
