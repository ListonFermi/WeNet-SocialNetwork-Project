"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

interface AddImageProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const AddImage: React.FC<AddImageProps> = ({ setPage }) => {
  const userData = useSelector((store: any) => store.user.userData);

  const router = useRouter();
  return (
    <div className="h-full w-full bg-secColor">
      <div className="h-[35%] flex items-center justify-center">
        <h1 className="text-white font-bold text-2xl">Add profile pic</h1>
      </div>
      <div className="h-[30%] flex flex-col items-center justify-center">
        <div className="p-5">
          <Image
            width={100}
            height={100}
            alt="galleryPic"
            src={"/icons/gallery.svg"}
            className=""
          />
        </div>
        <input
          type="file"
          className="bg-rootBg hover:bg-green-700 text-white font-bold p-2 rounded-lg focus:outline-none focus-shadow-outline"
          onChange={() => setPage("crop")}
        />
      </div>
    </div>
  );
};

export default AddImage;
