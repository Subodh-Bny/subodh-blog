import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { internalError } from "./internalError";
import bcryptjs from "bcryptjs";
import generateTokenAndCookie from "@/utils/generateToken";

const createUser = async (req: Request) => {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed." },
      { status: 404 }
    );
  }

  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", data: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
};

export const login = async (req: Request) => {
  await dbConnect();

  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User doesnot exist." },
        { status: 404 }
      );
    }

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 404 }
      );
    }

    const token = await generateTokenAndCookie(user?._id);

    return NextResponse.json(
      {
        message: "Logged in",
        data: {
          _id: user?._id,
          username: user?.username,
          email: user?.email,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return internalError("Error in  login  controller", error);
  }
};

export { createUser };
