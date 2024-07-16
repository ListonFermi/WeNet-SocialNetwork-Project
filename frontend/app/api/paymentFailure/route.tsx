import PayUApiCalls from "@/utils/apiCalls/PayUApiCalls";
import { NextApiResponse } from "next";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers'

export async function POST(req: any, res: NextApiResponse) {
  const contentType = req.headers.get("content-type") || "";
  console.log({ contentType });

  const data: { [key: string]: any } = {};

  try {
    const formData = await req.formData();
    formData.forEach((value: any, key: string) => {
      data[key] = value;
    });

    //save to payuorders collection
    const PayUOrderId = await PayUApiCalls.saveData(data);

  } catch (error: any) {
    console.log(error.message);
  }

  redirect(
    `/post/promote/paymentCompleted/?status=${data.status}&mihpayid=${data.mihpayid}`
  );
}
