"use client";
import postService from "@/utils/apiCalls/postService";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface post {
  _id: string;
  imageUrl: string;
  caption: string;
}

function Promote() {
  const { id } = useParams<{ id: string }>();
  const [postData, setPostData] = useState<null | post>(null);

  useEffect(() => {
    (async function (id: string) {
      try {
        const data = await postService.getSinglePostData(id);
        setPostData(data);
      } catch (error) {
        console.log({ error });
      }
    })(id);
  }, []);

  if (!postData)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <h1 className="text-white font-bold">Loading</h1>
      </div>
    );

  return (
    <div className="bg-secColor w-full h-full">
      <div className="h-[10%] w-ful flex items-center justify-center">
        <h1 className="font-bold text-white text-2xl">Promote Post</h1>
      </div>
      <div className="h-[50%] w-full flex flex-col items-end justify-center">
        <div className="w-full flex items-center justify-center">
          <p className="font-bold text-white text-xs w-[60%]">
            {postData.caption}
          </p>
        </div>
        <div className="w-full flex items-center justify-center">
          <Image
            src={postData.imageUrl}
            width={350}
            height={350}
            alt={"Image"}
            className="h-72 w-72"
          />
        </div>
      </div>
      <div className="h-[40%] w-full">
        <div className="w-full h-[25%] flex items-center justify-center">
          <Image
            src={"/icons/wenetAds.png"}
            width={160}
            height={40}
            alt="WeNet Ads icon"
          />
        </div>
        <div className="w-full h-[25%] flex items-center justify-center">
          
        </div>
        <div className="w-full h-[25%] flex items-center justify-center">
          <p className="font-semibold text-white w-[80%] text-justify">
            Pay ₹1000 and have your post reach to more audience for 30days using
            WeNet Ads
          </p>
        </div>
      </div>
    </div>
  );
}

export default Promote;
