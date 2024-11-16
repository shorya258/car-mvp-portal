import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
        return NextResponse.json(
            {
              success: false,
              message: "Missing required fields",
            },
            { status: 400 }
          );
    }
    const existingUserByEmail= await UserModel.findOne({email})
    if(!existingUserByEmail){
        return NextResponse.json(
            {
              success: false,
              message: "User does not exist.",
            },
            { status: 400 }
          );
    }
    const passwordCompare= await bcrypt.compare(password, existingUserByEmail.password);
    if(!passwordCompare){
        return NextResponse.json(
            {
              success: false,
              message: "Try logging in with correct credentials",
            },
            { status: 400 }
          );
    }
    const dataToStore= {
      username:existingUserByEmail.username,
      userId:existingUserByEmail._id
    }
    const authToken= jwt.sign(dataToStore, process.env.JWT_SECRET)
    return NextResponse.json(
        {
          success: true,
          message: "Logged in successfully.",
          authToken:authToken
        },
        { status: 201 }
      );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
        {
          success: false,
          message: "Problem signing in",
        },
        { status: 500 }
      );
  }
}
