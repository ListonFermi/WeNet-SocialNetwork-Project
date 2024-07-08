import { IUser } from "@/types/types";
import Image from "next/image";
import React from "react";

function UserSearch({ results }: { results: IUser[] }) {
  return (
    <>
      {results.length &&
        results.map((result) => {
          const { username, firstName, lastName, profilePicUrl } = result;

          return (
            <a href={`/profile/${username}`} className="w-[75%] flex items-center justify-center border-2 border-secColorH mt-2 hover:bg-rootBg">
              <div className="h-20 w-full flex bg-secColor mt-2">
                <div className="w-30%">
                  <div className="h-full w-full flex items-center">
                    <Image
                      src={profilePicUrl}
                      alt="profilePic"
                      width={45}
                      height={45}
                      className="rounded-full object-cover ml-1"
                    />
                  </div>
                </div>
                <div className="w-[70%] flex justify-center items-center">
                  <h1 className="font-bold text-white">{`${firstName} ${lastName}`}</h1>
                </div>
              </div>
            </a>
          );
        })}
    </>
  );
}

export default UserSearch;
