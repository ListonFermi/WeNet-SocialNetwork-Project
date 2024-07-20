import Image from "next/image";
import React from "react";

function isPending() {
  return (
    <div className="w-full h-[75%] flex flex-col items-center justify-center">
      <div>
        <Image
          src={"/icons/pending.png"}
          alt="pending icon"
          width={64}
          height={64}
        />
      </div>
      <div>
        <h1 className="text-white font-semibold">
          Your request is submitted and pending for approval!
        </h1>
      </div>
    </div>
  );
}

export default isPending;
