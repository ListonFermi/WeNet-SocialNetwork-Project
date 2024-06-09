import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cookies } from 'next/headers'
import getUserData from "@/utils/getUserData";


function AdminSideBar() {
  

  return (
    <div className="w-[100%] h-full max-w-full overflow-hidden bg-secColor">
      <div className="h-[50%] flex flex-col">
        <div className="flex items-center mt-[3%] mx-[10%] rounded-lg cursor-pointer hover:bg-secColorH">
          {/* <Image
            src="/icons/home.svg"
            alt="Home Logo"
            width={50}
            height={50}
            className="h-12 w-12"
          /> */}
          <p className="pl-5 text-2xl text-white font-bold">WeNet Dashboard</p>
        </div>
        <div className="flex items-center mt-[3%] mx-[10%] rounded-lg  cursor-pointer hover:bg-secColorH">
          {/* <Image
            src="/icons/notification.svg"
            alt="Home Logo"
            width={50}
            height={50}
            className=""
          /> */}
          <p className="pl-5 text-2xl text-white font-bold">User Management</p>
        </div>
        <div className="flex items-center mt-[3%] mx-[10%] rounded-lg  cursor-pointer hover:bg-secColorH">
          {/* <Image
            src="/icons/message.svg"
            alt="Home Logo"
            width={50}
            height={50}
            className=""
          /> */}
          <p className="pl-5 text-2xl text-white font-bold">Reports Management</p>
        </div>
        <div className="flex items-center mt-[3%] mx-[10%] rounded-lg  cursor-pointer hover:bg-secColorH">
          {/* <Image
            src="/icons/bookmark.svg"
            alt="Home Logo"
            width={50}
            height={50}
            className=""
          /> */}
          <p className="pl-5 text-2xl text-white font-bold">WeNet Tick Management</p>
        </div>
        <div className="flex items-center mt-[3%] mx-[10%] rounded-lg  cursor-pointer hover:bg-secColorH">
          {/* <Image
            src="/icons/search.svg"
            alt="Home Logo"
            width={50}
            height={50}
            className=""
          /> */}
          <p className="pl-5 text-2xl text-white font-bold">Ads Management</p>
        </div>
      </div>
      <div className="h-[30%]"></div>
      <div className="h-[20%]">
        <div className="flex items-center mt-[3%] mx-[10%] rounded-lg cursor-pointer hover:bg-secColorH">
          <Image
            src="/icons/menu2.svg"
            alt="Home Logo"
            width={50}
            height={50}
            className=""
          />
          <p className="pl-5 text-2xl text-white font-bold">More</p>
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
