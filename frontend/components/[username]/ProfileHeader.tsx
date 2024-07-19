"use client";
import { IUser } from "@/types/types";
import userService from "@/utils/apiCalls/userService";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfileHeaderLoading from "./ProfileHeaderLoading";
import messageService from "@/utils/apiCalls/messageService";
import { useRouter } from "next/navigation";
import FollowUnfollow from "./FollowUnfollow";
import ProfileHeaderBottom from "./ProfileHeaderBottom";
import BlockAlert from "./BlockAlert";
import { toast } from "react-toastify";
import { BlockedOverlay } from "./BlockedOverlay";

function ProfileHeader({ currUser }: { currUser: IUser }) {
  const currUserId = currUser._id;

  const router = useRouter();

  const params = useParams<{ username: string }>();
  const paramsUsername = params.username;

  const [userData, setUserData] = useState<IUser | null>(null);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.getProfileData(paramsUsername);
        const { _id } = userData;
        if (_id != currUserId) {
          console.log({_id})
          const isBlocked = await userService.isBlocked(_id);
          setIsBlocked(isBlocked);
        }
        setUserData(userData);
      } catch (error: any) {
        alert(error.message);
      }
    };

    if (paramsUsername) {
      fetchUserData();
    }
  }, [paramsUsername, changed]);

  if (!userData) return <ProfileHeaderLoading />;

  const { _id, firstName, lastName, username } = userData;
  let { dateOfBirth, bio, profilePicUrl, coverPicUrl, location } = userData;

  const isOwnProfile = _id === currUserId;

  dateOfBirth = new Date(dateOfBirth + "");
  const dateOfBirthToDisplay = `${dateOfBirth?.getDate()}-${dateOfBirth?.getMonth()}-${dateOfBirth?.getFullYear()}`;

  if (!bio) bio = "";
  if (!profilePicUrl) profilePicUrl = "/img/DefaultProfilePicMale.png";
  if (!coverPicUrl) coverPicUrl = "";

  async function handleSendMessage() {
    try {
      const convoData = await messageService.createConversation(_id);
      router.push(`/messages?convoId=${convoData._id}&username=${username}`);
    } catch (error: any) {
      alert(error.messaage);
    }
  }

  async function handleBlock() {
    try {
      await toast.promise(userService.blockUser(_id), {
        pending: "Toggling block operation",
        success: "Successfully done",
        error: "Error toggling",
      });
      setChanged((state) => !state);
    } catch (error: any) {
      alert(error.messaage);
    }
  }

  return (
    <>
      {isBlocked && <BlockedOverlay />}
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
            <div className="flex flex-col w-[40%] align-middle">
              <h1 className="text-2xl lg:text-3xl md:text-xl sm:text-lg font-bold text-white px-4 sm:px-2">{`${firstName} ${lastName}`}</h1>
              <h1 className="text-xs lg:text-xs md:text-xs sm:text-xs font-bold text-white py-2 px-4 sm:py-1 sm:px-2">{`@${username}`}</h1>
            </div>

            {/* Edit / follow button */}
            <div className="w-[30%] flex flex-col items-center align-middle">
              {isOwnProfile ? (
                <a href={`/profile/${username}/edit`}>
                  <button
                    type="button"
                    className="bg-rootBg hover:bg-green-700 text-white text-xs md:text-sm font-bold p-1 rounded focus:outline-none focus-shadow-outline"
                  >
                    Edit Profile
                  </button>
                </a>
              ) : (
                <>
                  <div className="flex">
                    <FollowUnfollow
                      userId={_id}
                      username={username}
                      setChanged={setChanged}
                    />
                    <BlockAlert
                      alert="Do you really wanna block this user?"
                      onConfirm={handleBlock}
                    >
                      <div className="w-[50%] flex flex-row-reverse cursor-pointer">
                        <Image
                          src="/icons/blockedUsers.svg"
                          alt="Cover Pic"
                          width={30}
                          height={30}
                        />
                      </div>
                    </BlockAlert>
                  </div>
                  <div className="cursor-pointer" onClick={handleSendMessage}>
                    <Image
                      src="/icons/message.svg"
                      alt="Home Logo"
                      width={50}
                      height={50}
                      className="h-10 w-10"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="h-1/2">
            <div className="h-2/3 flex items-center justify-center">
              <h1 className="font-semibold text-white">{bio}</h1>
            </div>
            <div className="flex flex-row">
              <div className="w-1/2 flex items-center justify-center align-middle">
                <Image
                  src="/icons/location.svg"
                  alt="dob icon"
                  width={100}
                  height={100}
                  className="w-4 h-4"
                ></Image>
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
      <ProfileHeaderBottom userData={userData} />
    </>
  );
}

export default ProfileHeader;
