import React from "react";
import ProfileHeader from "./ProfileHeader";
import getUserData from "@/utils/getUserData";

function Profile() {
    let userData
  try {
    const decoded : any = getUserData()
    userData = decoded.userData
  } catch (error: any) {
    console.log(error.message)
    return <div>Error getting current user's data</div>
  }

  return (
    <div>
      <ProfileHeader currUser={userData} />
      <div className="h-10 w-full flex bg-secColor">
        <div className="shadow-inner rounded-sm shadow-rootBg w-1/2 flex items-center justify-center">
          <h1 className="text-white font-bold cursor-pointer">Posts</h1>
        </div>
        <div className="shadow-lg w-1/2 flex items-center justify-center">
          <h1 className="text-white font-bold cursor-pointer">Likes</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;
