import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { IUser } from "@/types/types";

export default function getUserData(): IUser {
  const cookieStore = cookies();
  const token = cookieStore.get("token") || { name: "token", value: "" };
  if (!token.value) throw new Error("Token not found");

  const secret = process.env.JWT_SECRET || "";
  if (!secret) throw new Error("JWT secret not found");
  try {
    return jwt.verify(token.value, secret) as IUser;
  } catch (err: any) {
    throw new Error(err.message);
  }
}