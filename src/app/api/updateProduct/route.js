import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/model/Product";
import { NextResponse } from "next/server";
export async function PUT(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { productDetails, newImages, retainedImages } = body;
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
    if (!Array.isArray(newImages) || !Array.isArray(retainedImages)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please upload atleast one image",
        },
        { status: 400 }
      );
    }
    const productId = productDetails._id;
    const productToBeUpdated = await ProductModel.findById(productId);
    if (!productToBeUpdated) {
      return NextResponse.json(
        {
          success: false,
          message: "Product does not exist.",
        },
        { status: 400 }
      );
    }
    const finalImages = [...retainedImages, ...newImages];
    await ProductModel.findByIdAndUpdate(
      productId,
      {
        $set: { productDetails, images: finalImages },
      },
      { new: true, runValidators: true }
    );
    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Problem updating product.",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { productId } = body;
    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required field.",
        },
        { status: 400 }
      );
    }
    const productToBeDeleted = await ProductModel.findById(productId);
    if (!productToBeDeleted) {
      return NextResponse.json(
        {
          success: false,
          message: "Product does not exist.",
        },
        { status: 400 }
      );
    }
    await ProductModel.findByIdAndDelete(productId);
    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Problem deleting product.",
      },
      { status: 500 }
    );
  }
}
