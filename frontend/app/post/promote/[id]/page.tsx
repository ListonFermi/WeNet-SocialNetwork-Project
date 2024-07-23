import Navbar from "@/components/Navbar";
import FeedLeftDiv from "@/components/feed/FeedLeftDiv";
import Promote from "@/components/post/promote/[id]/Promote";
import getUserData from "@/utils/getUserData";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

function page( ) {
  let userData;
  try {
    const decoded: any = getUserData();
    userData = decoded.userData;
  } catch (error: any) {
    console.log(error.message);
    return <div>{`Error getting current user's data`}</div>;
  }

  return (
    <div className="max-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1 hidden md:block bg-feedBg">
          <FeedLeftDiv />
        </div>
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 h-screen overflow-y-auto no-scrollbar bg-feedBg">
          <Promote currUserData={userData} />
        </div>
        <div className="relative flex-1 hidden md:block bg-feedBg"></div>
      </div>
    </div>
  );
}

export default page;
