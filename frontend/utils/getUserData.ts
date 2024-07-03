import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function getUserData() : any {
  const cookieStore = cookies();
  const token = cookieStore.get("token") || { name: "token", value: "" };
  if (!token.value.length) throw new Error("Token not found");

  const secret = process.env.JWT_SECRET || "";
  if (!secret) throw new Error("JWT secret not found");
  try {
    return jwt.verify(token.value, secret)
  } catch (err: any) {
    throw new Error(err.message);
  }
}