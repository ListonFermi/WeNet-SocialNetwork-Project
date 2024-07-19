'use client'
import { useRouter } from "next/navigation";
import React from "react";

export const BlockedOverlay: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex justify-center items-center">
      <div>
        <h2 className="text-white text-xl font-bold">
          This Profile has been blocked by you
        </h2>
        <div className="p-4 flex justify-evenly">
          <button
            className="bg-rootBg p-2 rounded-lg"
            onClick={() => router.push("/")}
          >
            Go to feed
          </button>
          <button
            className="bg-rootBg p-2 rounded-lg"
            onClick={() =>
              router.push("/settings?settingNameQuery=blockedUsers")
            }
          >
            Unblock user
          </button>
        </div>
      </div>
    </div>
  );
};
