'use client'
import Image from "next/image";
import React from "react";
import FeedPostSkeleton from "./FeedPostSkeleton";
import BasicPopover from "./post/[id]/BasicPopover";
import HeartAnimation from "./post/[id]/HeartAnimation";
import postService from "@/utils/apiCalls/postService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IPost } from "@/types/types";
import { useRouter } from "next/navigation";
import { toastOptions } from "@/utils/toastOptions";
import { formatDate } from "@/utils/formatString";

type props = {
  postData: IPost | null;
  currentUserId?: string;
};

function FeedPost({ postData, currentUserId='' }: props) {
  if (!postData) return <FeedPostSkeleton />;

  const router = useRouter()

  const {
    _id,
    username,
    firstName,
    lastName,
    caption,
    imageUrl,
    isLiked,
    profilePicUrl,
    isBookmarked
  } = postData;

  const { likedBy, comments, updatedAt } = postData;
  const commentsCount = comments?.length;
  const timestamp = formatDate(updatedAt);

  const [showHeart, setShowHeart] = React.useState(false);
  const [liked, setLiked] = React.useState(isLiked);
  const [bookmarked, setBookmarked] = React.useState(isBookmarked);
  const [likesCount, setLikesCount] = React.useState(likedBy?.length || 0);

  const postId = postData._id;
  const isOwnPost = postData.userId === currentUserId;

  const handleLike = async () => {
    try {
      setLiked(!liked);
      if (!liked) {
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 2500);
      }
      const likesCount = await postService.toggleLike("post", _id);
      setLikesCount(likesCount);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleBookmarkPost = async () => {
    try {
      let response: any = await toast.promise(
        postService.toggleBookmark(postId),
        {
          pending: "Toggling bookmark",
          success: "Toggle bookmark done",
          error: "Failed to toggle bookmark",
        },
        toastOptions
      );
      setLiked(!bookmarked);
      console.log({response})
      toast(response, toastOptions)
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="bg-secColor mb-2 mt-2 shadow-md rounded-lg">
      <ToastContainer/>
      <div className="flex justify-evenly py-2">
        <div className="flex items-center">
          <div>
            <Image
              src={profilePicUrl}
              alt="Profile Pic"
              width={150}
              height={150}
              className="w-16 h-16 object-cover rounded-full"
            />
            <p className="text-white text-sm font-semibold">@{username}</p>
          </div>
          <div className="px-4">
            <h3 className="text-white text-xl font-bold">{`${firstName} ${lastName}`}</h3>
            <div className="flex items-center cursor-pointer" onClick={()=>router.push(`/post/${_id}`)}>
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
        <BasicPopover isOwnPost={isOwnPost} postId={postId} />
      </div>
      <p className="font-semibold px-6 py-2 text-white">{caption}</p>
      <div className="relative" onDoubleClick={handleLike}>
        <Image
          src={imageUrl}
          alt="Tokyo"
          width={1000}
          height={1000}
          className="w-full h-[400px] object-cover  mt-4"
        />
        <HeartAnimation visible={showHeart} />
      </div>
      <div className="flex justify-between items-center p-4">
        <span
          className={`${liked ? "text-pink-500" : "text-rootBg"} flex cursor-pointer`}
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
        <span className="text-purple-500 flex items-center">
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
          className="h-8 w-8 mb-2"
        />
        
      </div>
    </div>
  );
}

export default FeedPost;
