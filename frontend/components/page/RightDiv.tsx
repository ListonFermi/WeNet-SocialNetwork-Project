// 'use client'
import Link from "next/link";
import React from "react";
import Button from "../Button";

function RightDiv() {
  return (
    <div className="relative flex items-center justify-center h-full">
      {/* Background Image */}
      <img
        src="/img/HomePageRight.jpg"
        alt="Right-Background"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />
      {/* Text Content */}
      <div className="z-10 p-4 bg-none bg-opacity-50 rounded">
        <p className="text-2xl font-bold text-center text-white">
          What’s happening ? Find out now!
        </p>
        <br />
        <br />
        <p className="text-2xl font-bold text-center text-white">
          Already have an account?
        </p>
        <br />
        <br />
        <div className="flex items-center justify-center">
          <Link href={"/login"}>
            <Button text={"Login"} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RightDiv;
