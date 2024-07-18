import Image from "next/image";
import React from "react";

type props = { text: string; count: number; iconName: string };

function DashboardCard({ text, count, iconName }: props) {
  return (
    <div className="bg-secColor p-4 rounded-lg flex items-center">
      <div className="bg-rootBg rounded-full w-12 h-12 flex items-center justify-center mr-4">
        <Image
          src={`/icons/admin/${iconName}.png`}
          alt="Home Logo"
          width={50}
          height={50}
          className="h-10 w-10"
        />
      </div>
      <div>
        <h2 className="text-lg font-bold text-white">{count}</h2>
        <p className="text-sm text-gray-400">{text}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
