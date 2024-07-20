import Image from "next/image";
import React from "react";

function isApproved() {
  return (
    <div className="w-full h-[75%] flex flex-col items-center justify-center">
      <div>
        <Image
          src={"/icons/wenetTick.png"}
          alt="pending icon"
          width={64}
          height={64}
        />
      </div>
      <div>
        <h1 className="text-white font-semibold">
          Yay! Your request was accepted and you have approved with a WeNet-Tick
          !
        </h1>
      </div>
    </div>
  );
}

export default isApproved;
