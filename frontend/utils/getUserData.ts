import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { unstable_noStore as noStore } from 'next/cache';
import { JWT_SECRET } from "./constants";

export default function getUserData() : any {
  noStore()

  const cookieStore = cookies();
  const token = cookieStore.get("token") || { name: "token", value: "" };
  if (!token.value.length) throw new Error("Token not found");

  const secret = JWT_SECRET || "";
  if (!secret) throw new Error("JWT secret not found");
  try {
    return jwt.verify(token.value, secret)
  } catch (err: any) {
    throw new Error(err.message);
  }
}