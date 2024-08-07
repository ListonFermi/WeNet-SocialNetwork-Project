"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import FeedPostSkeleton from "./FeedPostSkeleton";
import BasicPopover from "./post/[id]/BasicPopover";
import HeartAnimation from "./post/[id]/HeartAnimation";
import postService from "@/utils/apiCalls/postService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IPost, IUser } from "@/types/types";
import { useRouter } from "next/navigation";
import { toastOptions } from "@/utils/toastOptions";
import { formatDate } from "@/utils/formatString";
import PromotedPost from "./PromotedPost";
import userService from "@/utils/apiCalls/userService";

type props = {
  postData: IPost | null;
  currUserData?: IUser;
};

function FeedPost({ postData, currUserData }: props) {
  const router = useRouter();

  const [isVerified, setIsVerified] = React.useState(false);
  const [showHeart, setShowHeart] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [likesCount, setLikesCount] = React.useState(0);

  useEffect(() => {
    if (postData) {
      setLiked(postData.isLiked);
      setBookmarked(postData.isBookmarked);
      setLikesCount(postData?.likedBy?.length || 0)
    }
  }, [postData]);

  useEffect(() => {
    (async function () {
      try {
        if(postData){
          const hasWenetTick = await userService.hasWenetTick(postData.username);
          setIsVerified(hasWenetTick);
        }
      } catch (error: any) {
        console.log("Error checking isVerified in post");
        console.log(error.message);
      }
    })();
  }, [postData?.username]);

  if (!postData) return <FeedPostSkeleton />;

  let isPublicFeed = false;
  if (!currUserData) isPublicFeed = true;

  const {
    _id,
    username,
    firstName,
    lastName,
    caption,
    imageUrl,
    profilePicUrl,
  } = postData;

  const { likedBy, comments, createdAt } = postData;
  const commentsCount = comments?.length;
  const timestamp = formatDate(createdAt);

  const handleLike = async () => {
    if (isPublicFeed) return;

    try {
      setLiked((liked) => !liked);
      if (!liked) {
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 2500);
      }
      const likesCount = await postService.toggleLike("post", _id);
      console.log({ likesCount });
      setLikesCount(likesCount);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleBookmarkPost = async (event: any) => {
    if (isPublicFeed) return;

    try {
      let response: any = await toast.promise(
        postService.toggleBookmark(_id),
        {
          pending: "Toggling bookmark",
          success: "Toggle bookmark done",
          error: "Failed to toggle bookmark",
        },
        toastOptions
      );
      setLiked(!bookmarked);
      toast(response, toastOptions);
    } catch (error: any) {
      toast.error(error);
    }
  };

  function handleClickProfile() {
    router.push(`/profile/${username}`);
  }

  if (postData?.fromAdsService) return <PromotedPost postData={postData} />;

  return (
    <div
      className="bg-secColor mb-2 mt-2 shadow-md rounded-lg"
      // onClick={handlePostClickOnPublicFeed}
    >
      <ToastContainer />
      <div className="flex justify-evenly py-2">
        <div className="flex items-center">
          <div className="cursor-pointer" onClick={handleClickProfile}>
            <Image
              src={profilePicUrl}
              alt="Profile Pic"
              width={300}
              height={300}
              className="w-16 h-16 object-cover rounded-full"
            />
            <p
              className="text-white text-sm font-semibold cursor-pointer"
              onClick={handleClickProfile}
            >
              @{username}
            </p>
          </div>
          <div className="px-4">
            <div className="flex items-center">
              <h3
                className="text-white text-xl font-bold cursor-pointer"
                onClick={handleClickProfile}
              >{`${firstName} ${lastName}  `}</h3>
              {isVerified && (
                <Image
                  src="/icons/wenetTick.png"
                  alt="wenet-tick"
                  height={24}
                  width={24}
                  className="ml-2"
                />
              )}
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.push(`/post/${_id}`)}
            >
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
        </div>
        {!isPublicFeed && (
          <BasicPopover postData={postData} currUserData={currUserData} />
        )}
      </div>
      <p className="font-semibold px-6 py-2 text-white">{caption}</p>
      <div className="relative" onDoubleClick={handleLike}>
        <Image
          src={imageUrl}
          alt="Tokyo"
          width={1000}
          height={1000}
          className="w-full h-[400px] object-contain mt-4 cursor-pointer"
          onClick={() => router.push(`/post/${_id}`)}
        />
        <HeartAnimation visible={showHeart} />
      </div>
      <div className="flex justify-between items-center p-4">
        <span
          className={`${
            liked ? "text-pink-500" : "text-rootBg"
          } flex cursor-pointer`}
          onClick={handleLike}
        >
          <Image
            src={`/icons/${liked ? "heart.svg" : "notLiked.png"}`}
            width={150}
            height={150}
            alt=""
            className="h-8 w-8"
          />
          <p className="font-bold">{likesCount}</p>
        </span>
        <span
          className="text-purple-500 flex items-center cursor-pointer"
          onClick={() => router.push(`/post/${_id}`)}
        >
          <Image
            src="/icons/chat.svg"
            width={150}
            height={150}
            alt=""
            className="h-8 w-8"
          />
          <p className="font-bold">{commentsCount}</p>
        </span>
        <Image
          onClick={handleBookmarkPost}
          // src="/icons/bookmark.svg"
          src="/icons/bookmarked.png"
          width={150}
          height={150}
          alt=""
          className="h-8 w-8 mb-2 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default FeedPost;
