import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/model/Product";
import { NextResponse } from "next/server";
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { username } = body;
    if (!username) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }
    const productsByUsername = await ProductModel.find({ username });
    if (productsByUsername.length===0) {
      return NextResponse.json(
        {
          success: false,
          message: "User has not added any products.",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Fetched products successfully.",
        products: productsByUsername,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Problem fetching products.",
      },
      { status: 500 }
    );
  }
}
