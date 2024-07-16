import adsService from "@/utils/apiCalls/adsService";
import PayUApiCalls from "@/utils/apiCalls/PayUApiCalls";
import { NextApiResponse } from "next";
import { redirect } from "next/navigation";

export async function POST(req: any, res: NextApiResponse) {
  const contentType = req.headers.get("content-type") || "";
  console.log({ contentType });

  const formData = await req.formData();

  const data: { [key: string]: any } = {};
  formData.forEach((value: any, key: string) => {
    data[key] = value;
  });
  console.log(data)

  try {
    const PayUOrderId = await PayUApiCalls.saveData(data);
    await adsService.addTransaction(PayUOrderId, data.email, "success");
  } catch (error: any) {
    console.log(error.message);
  }
  redirect(
    `/post/promote/paymentCompleted/?status=${data.status}&mihpayid=${data.mihpayid}`
  );
}
