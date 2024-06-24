import Image from "next/image";
import React from "react";

function AddComment() {
  return (
    <div className="w-full h-40 bg-secColor flex rounded-lg overflow-hidden mt-2">
      <div className="h-full w-[25%] flex flex-col items-center justify-center">
        <Image
          src={""}
          alt="Profile Pic"
          width={500}
          height={500}
          className="w-20 h-20 object-cover rounded-full cursor-pointer hover:border-2"
        />
        <h1 className="text-white font-semibold">@Charlie</h1>
      </div>
      <div className="h-full w-[75%]">
        <form className="h-full w-full">
          <div className="h-4/5 w-full p-2">
            <textarea className="h-full w-full rounded-lg bg-black text-white"></textarea>
          </div>
          <div className="flex justify-end px-4">
            <button
              type="button"
              className="bg-rootBg hover:bg-green-700 text-white text-xs md:text-sm font-bold p-1 rounded focus:outline-none focus-shadow-outline"
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddComment;
