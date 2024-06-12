import { IUser } from "@/types/types";
import Image from "next/image";
import React from "react";

function ProfileHeader({ userData }: { userData: IUser }) {
  const { firstName, lastName, username } = userData;
  let { dateOfBirth, bio, profilePicUrl, coverPicUrl, location } = userData;

  dateOfBirth = new Date(dateOfBirth + "");
  const dateOfBirthToDisplay = `${dateOfBirth?.getDate()}-${dateOfBirth?.getMonth()}-${dateOfBirth?.getFullYear()}`;

  if (!bio) bio = "";
  if (!profilePicUrl) profilePicUrl = "/img/DefaultProfilePicMale.png";
  if (!coverPicUrl) coverPicUrl = "";

  return (
    <div className="h-96 w-full shadow-md bg-secColor">
      {/* Cover Pic */}
      <div className=" h-1/2 bg-black">
        {coverPicUrl.length && (
          <Image
            src={coverPicUrl}
            alt="Cover Pic"
            width={400}
            height={300}
            className="w-full h-full border-2 border-rootBg object-cover"
          />
        )}
      </div>
      {/* Profile Details */}
      <div className="flex flex-col h-1/2">
        {/* Profile Details- Upper portion : Username, button */}
        <div className="h-1/2 flex flex-row">
          {/* Profile Pic  */}
          <div className="relative w-[30%] left-0 ml-4 -top-20">
            <Image
              src={profilePicUrl}
              alt="Profile Pic"
              width={100}
              height={100}
              className="w-40 h-40 border-2 border-rootBg object-cover rounded-full cursor-pointer hover:border-4"
            />
          </div>
          {/* Full name && username  */}
          <div className="flex flex-col w-[50%] align-middle">
            <h1 className="text-2xl lg:text-4xl md:text-xl sm:text-lg font-bold text-white px-4 sm:px-2">{`${firstName} ${lastName}`}</h1>
            <h1 className="text-xs lg:text-xs md:text-xs sm:text-xs font-bold text-white py-2 px-4 sm:py-1 sm:px-2">{`@${username}`}</h1>
          </div>

          {/* Edit / follow button */}
          <div className="w-[20%] flex items-center align-middle">
            <a href={`/profile/${username}/edit`}>
              <button
                type="button"
                className="bg-rootBg hover:bg-green-700 text-white text-xs md:text-sm font-bold p-1 rounded focus:outline-none focus-shadow-outline"
              >
                Edit Profile
              </button>
            </a>
          </div>
        </div>
        {/* Profile Details- Bottom portion :Bio, location */}
        <div className="h-1/2">
          {/* Bio  */}
          <div className="h-2/3 flex items-center justify-center">
            <h1 className="font-semibold text-white">{bio}</h1>
          </div>
          {/* Dob, place  */}
          <div className="flex flex-row">
            <div className="w-1/2 flex items-center justify-center align-middle">
              <Image
                src="/icons/location.svg"
                alt="dob icon"
                width={100}
                height={100}
                className="w-4 h-4"
              ></Image>{" "}
              <h1 className="font-semibold px-2 text-white text-sm">
                {`Location: ${location}`}
              </h1>
            </div>
            <div className="w-1/2 flex items-center justify-center align-middle">
              <Image
                src="/icons/dob.svg"
                alt="dob icon"
                width={100}
                height={100}
                className="w-4 h-4"
              ></Image>{" "}
              <h1 className="font-semibold px-2 text-white text-sm">
                Born on {dateOfBirthToDisplay}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
