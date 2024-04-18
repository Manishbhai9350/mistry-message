import { hash } from "@/helpers/bcrypt";
import sendMail from "@/helpers/email";
import connect from "@/lib/db_connection";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface requestData {
  username?: string;
  email?: string;
  password?: string;
}

connect();
export async function POST(request: NextRequest) {
  try {
    const { username, email, password }: any = await request.json();
    const userByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (userByUsername) {
      return NextResponse.json({
        message: "User already exists",
        success: false,
      });
    }

    var userByEmail = await UserModel.findOne({
      email,
    });

    if (userByEmail && userByEmail.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        } b,
        {
          status: 401,
        }
      );
    }
    else {
        
    var hashedPass = await hash(password);
    var verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const createdUser = await UserModel.create({
      username,
      email,
      verifyCode,
      password: hashedPass,
      isVerified: false,
      isAdmin: false,
      verifyCodeExpire: Date.now() + 3600000,
      messages: [],
    });

    }
    var mailRes = await sendMail(username, email, verifyCode);
    console.log(mailRes);

    return NextResponse.json({
      message: "User Signup Successfully",
      user: {
        username,
        email,
      },
    });
  } catch (error: any) {
    console.log("error hai ", error.message);
    return NextResponse.json(
      {
        message: "signup failed",
        success: false,
      },
      {
        status: 400,
      }
    );
  }
}
