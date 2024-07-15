"use client";
import { useSearchParams, useRouter } from "next/navigation";

const PaymentCompleted = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const mihpayid = searchParams.get("mihpayid");
  const status = searchParams.get("status");

  return (
    <div className="h-full w-full bg-secColor flex items-center justify-center">
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-700">
              Transaction ID: <span className="font-semibold">{mihpayid}</span>
            </p>
          </div>
          <div className="pt-5">
            <button
              className="p-2 bg-rootBg rounded-lg text-white font-bold"
              onClick={() => router.push("/feed")}
            >
              Go To Feed
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full  h-full bg-gradient-to-r from-red-400 to-pink-500 p-6">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Payment Failed
            </h1>
            <p className="text-lg text-gray-700">
              Transaction ID: <span className="font-semibold">{mihpayid}</span>
            </p>
          </div>
          <div className="pt-5">
            <button
              className="p-2 bg-rootBg rounded-lg text-white font-bold"
              onClick={() => router.push("/feed")}
            >
              Go To Feed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCompleted;
