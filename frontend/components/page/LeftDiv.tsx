// 'use client'
import React from "react";
import Button from "../Button";
import Link from "next/link";
import Image from "next/image";

function LeftDiv() {
  return (
    <div className="relative flex items-center justify-center h-full">
      {/* Background Image */}
      <Image
        src="/img/HomePageLeft.jpg"
        alt="Left-Background"
        width={500}
        height={500}
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />
      <div className="z-10 p-4 bg-none bg-opacity-50 rounded">
        <p className="text-2xl font-bold text-center text-white">
          WeNet helps you connect and share with the people in your life.
        </p>
        <br />
        <br />
        <p className="text-2xl font-bold text-center text-white">Join Today</p>
        <br />
        <br />
        <div className="flex items-center justify-center">
          <Link href={"/signup"}>
            <Button text={"Signup"} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeftDiv;
