import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/model/Product";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log(body);
    const { userId, productDetails, productImages } = body;
    if (!userId || !productDetails) {
      console.log("Missing required fields");
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      console.log("The user does not exist.");
      return NextResponse.json(
        {
          success: false,
          message: "The user does not exist.",
        },
        { status: 400 }
      );
    }
    const newProduct = new ProductModel({
      user: userId,
      productName: productDetails.productName,
      productDescription: productDetails.productDescription,
      tags: productDetails.tags || [],
      images: productImages || [],
    });
    await newProduct.save();
    return NextResponse.json(
      {
        success: true,
        message: "Created product successfully.",
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
