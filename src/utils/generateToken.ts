import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const generateTokenAndCookie = async (
  userId: string | unknown
): Promise<string> => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "", {
    expiresIn: "7d",
  });

  const cookiesStore = await cookies();

  cookiesStore.set("jwt", token, {
    maxAge: 15 * 24 * 60 * 1000,
    httpOnly: false,
    sameSite: "strict",
    secure: process.env.NODE_ENV! == "development",
  });

  return token;
};

export default generateTokenAndCookie;
