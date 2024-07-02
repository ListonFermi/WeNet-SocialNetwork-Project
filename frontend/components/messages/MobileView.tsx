"use client";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import SingleConvo from "./SingleConvo";
import ConvoList from "./ConvoList";
import { IUser } from "@/types/types";

function MobileView({ currUser }: { currUser: IUser }) {
  const searchParams = useSearchParams();

  const convoId = searchParams.get("convoId");

  return (
    <div className="h-full w-full md:hidden flex flex-col">
      {convoId ? (
        <>
          <div className="absolute m-4  w-8 bg-black h-8 flex items-center">
            <a href="/messages">
              <Image
                src={"/icons/back.png"}
                alt="back button"
                width={25}
                height={25}
              />
            </a>
          </div>
          <SingleConvo currUser={currUser} />
        </> 
      ) : (
        <ConvoList />
      )}
    </div>
  );
}

export default MobileView;
