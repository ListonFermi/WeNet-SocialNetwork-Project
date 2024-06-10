import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileHeaderBottom from "./ProfileHeaderBottom";
import FeedPost from "../FeedPost";

function Profile() {
  return (
    <div>
      <ProfileHeader />
      <ProfileHeaderBottom />
      <div className="h-10 w-full flex bg-secColor">
        <div className="shadow-inner rounded-sm shadow-rootBg w-1/2 flex items-center justify-center">
          <h1 className="text-white font-bold cursor-pointer">Posts</h1>
        </div>
        <div className="shadow-lg w-1/2 flex items-center justify-center">
          <h1 className="text-white font-bold cursor-pointer">Likes</h1>
        </div>
      </div>
      {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
        <FeedPost />
      ))} */}
    </div>
  );
}

export default Profile;
