import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/model/Product";
import { NextResponse } from "next/server";
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { productId } = body;
    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }
    const singleProduct = await ProductModel.findOne({ _id: productId });
    console.log(singleProduct);
    if (!singleProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product does not exist.",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Fetched a product successfully.",
        singleProduct: singleProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Problem fetching this product.",
      },
      { status: 500 }
    );
  }
}
