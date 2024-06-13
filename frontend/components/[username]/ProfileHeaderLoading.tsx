import React from "react";

function ProfileHeaderLoading() {
  return (
    <div className="h-96 w-full shadow-md bg-secColor animate-pulse">
      {/* Cover Pic */}
      <div className="h-1/2 bg-gray-300"></div>
      {/* Profile Details */}
      <div className="flex flex-col h-1/2">
        {/* Profile Details- Upper portion : Username, button */}
        <div className="h-1/2 flex flex-row">
          {/* Profile Pic  */}
          <div className="relative w-[30%] left-0 ml-4 -top-20">
            <div className="w-40 h-40 bg-gray-300 rounded-full"></div>
          </div>
          {/* Full name && username  */}
          <div className="flex flex-col w-[50%] align-middle">
            <div className="h-8 bg-gray-300 rounded mt-4 mx-4"></div>
            <div className="h-4 bg-gray-300 rounded mt-2 mx-4"></div>
          </div>
          {/* Edit / follow button */}
          <div className="w-[20%] flex items-center align-middle">
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
        {/* Profile Details- Bottom portion :Bio, location */}
        <div className="h-1/2">
          {/* Bio  */}
          <div className="h-2/3 flex items-center justify-center">
            <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
          </div>
          {/* Dob, place  */}
          <div className="flex flex-row">
            <div className="w-1/2 flex items-center justify-center align-middle">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-32 bg-gray-300 rounded ml-2"></div>
            </div>
            <div className="w-1/2 flex items-center justify-center align-middle">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-32 bg-gray-300 rounded ml-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeaderLoading;
