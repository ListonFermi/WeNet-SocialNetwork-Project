import { formatDate } from "@/utils/formatString";
import Image from "next/image";
import React from "react";

type props = {
  username: string
  firstName: string;
  lastName: string;
  profilePicUrl: string;
  notificationMessage: string;
  entityType: "posts" | "users";
  entityId: any;
  updatedAt: string;
};

function SingleNotification(props: props) {
  const {
    username,
    firstName,
    lastName,
    profilePicUrl,
    notificationMessage,
    entityType,
    entityId,
    updatedAt,
  } = props;

  const timestamp = formatDate(updatedAt);

  let imageUrl;
  if (entityType === "posts") {
    imageUrl = entityId.imageUrl;
  }

  return (
    <a href={entityType === "posts"? `/post/${entityId._id}`: `/profile/${username}`} >
      <div className="h-28 w-full flex bg-secColor rounded-xl mt-4">
        <div className="h-full w-[20%] flex flex-col-reverse mr-2">
          <div className="h-full w-full flex items-center">
            <Image
              src={profilePicUrl}
              alt="profilePic"
              width={90}
              height={90}
              className="rounded-full object-cover ml-1"
            />
          </div>
        </div>
        <div className="h-full w-[60%] rounded-lg flex flex-col">
          <div className="h-[25%] w-full">
            <p className="text-white p-2 h-auto break-words font-bold">
              {`${firstName} ${lastName}`}
            </p>
          </div>
          <div className="h-[50%] w-full">
            <p className="text-white p-2 h-auto break-words">
              {notificationMessage}
            </p>
          </div>
          <div className="flex items-center px-2 flex-row">
            <Image
              src="/icons/show.svg"
              alt=""
              width={150}
              height={150}
              className="h-4 w-4"
            />
            <p className="text-gray-400 text-xs font-semibold px-2">
              {timestamp}
            </p>
          </div>
        </div>
        <div className="h-full w-[20%]">
          <>
            {entityType === "posts" && (
              <>
                <div className="flex h-full w-full items-center justify-center">
                  <Image
                    src={profilePicUrl}
                    alt="profile Pic"
                    width={90}
                    height={90}
                    className="object-cover"
                  />
                </div>
              </>
            )}
          </>
          <>
            {/* {entityType === "users" && (
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={imageUrl}
                alt="postPic"
                width={90}
                height={90}
                className="object-cover"
              />
            </div>
          )} */}
          </>
        </div>
      </div>
    </a>
  );
}

export default SingleNotification;
