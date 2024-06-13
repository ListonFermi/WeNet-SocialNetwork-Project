import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileHeaderBottom from "./ProfileHeaderBottom";
import getUserData from "@/utils/getUserData";
import FeedPost from "../FeedPost";

function Profile() {
    let userData
  try {
    const decoded : any = getUserData()
    userData = decoded.userData
  } catch (error: any) {
    console.log(error.message)
    return <div>Error getting user's data</div>
  }

  return (
    <div>
      <ProfileHeader userData={userData} />
      <ProfileHeaderBottom />
      <div className="h-10 w-full flex bg-secColor">
        <div className="shadow-inner rounded-sm shadow-rootBg w-1/2 flex items-center justify-center">
          <h1 className="text-white font-bold cursor-pointer">Posts</h1>
        </div>
        <div className="shadow-lg w-1/2 flex items-center justify-center">
          <h1 className="text-white font-bold cursor-pointer">Likes</h1>
        </div>
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() =>    <FeedPost />) }
    </div>
  );
}

export default Profile;
