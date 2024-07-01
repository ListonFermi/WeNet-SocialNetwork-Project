"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import SingleConvo from "./SingleConvo";
import ConvoList from "./ConvoList";

function MobileView() {
  const param = useParams();

  return (
    <div className="h-full w-full md:hidden bg-fuchsia-600 flex flex-col">
      {param?.convoId ? (
        <>
          <div className="absolute w-full bg-black h-16 flex items-center">
            <a href="/messages">
              <Image
                src={"/icons/back.png"}
                alt="back button"
                width={50}
                height={50}
              />
            </a>
          </div>
          <SingleConvo />
        </>
      ) : (
        <ConvoList />
      )}
    </div>
  );
}

export default MobileView;
