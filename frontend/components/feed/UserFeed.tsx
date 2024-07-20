"use client";
import React, { useEffect, useState } from "react";
import "@/assets/styles/globals.css";
import { toast } from "react-toastify";
import postService from "@/utils/apiCalls/postService";
import FeedPost from "../FeedPost";
import FeedPostSkeleton from "../FeedPostSkeleton";
import { IPost, IUser } from "@/types/types";
import userService from "@/utils/apiCalls/userService";
import adsService from "@/utils/apiCalls/adsService";

function Feed({ currUserData }: { currUserData?: IUser }) {

  const [topPostsData, setTopPostsData] = useState<IPost[] | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<IPost[] | null>(null);
  const [otherPosts, setOtherPosts] = useState<IPost[] | null>(null);
  const [promotedPosts, setPromotedPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    (async function () {
      try {
        try {
          let postData = await adsService.getPosts();
          postData = postData.map((data: any) => {
            data.fromAdsService = true;
            return data;
          });
          setPromotedPosts(postData);
          console.log({ postData });
        } catch (error: any) {
          console.log(error.message);
        }

        let { topPostsData }: { topPostsData: IPost[] } = await postService.getFeed();
        topPostsData = topPostsData.filter((data) => data && data?.userId  );

        const followingUsers = await userService.getFollowingUsers();

        setTopPostsData(topPostsData);

        const filteredPosts = topPostsData.filter((post) =>
          followingUsers.includes(post.userId)
        );
        setFilteredPosts(filteredPosts);

        const otherPosts = topPostsData.filter(
          (post) => !followingUsers.includes(post.userId)
        );
        setOtherPosts(otherPosts);
      } catch (error: any) {
        toast.error(error.message || "An error occurred");
        setTopPostsData(null);
        setFilteredPosts(null);
        setOtherPosts(null);
      }
    })();
  }, []);

  const mergePosts = (posts: IPost[], promotedPosts: IPost[]) => {
    const mergedPosts = [];
    let promotedIndex = 0;

    for (let i = 0; i < posts.length; i++) {
      mergedPosts.push(posts[i]);
      if ((i + 1) % 5 === 0 && promotedPosts[promotedIndex]) {
        mergedPosts.push(promotedPosts[promotedIndex]);
        promotedIndex++;
      }
    }

    // while (promotedIndex < promotedPosts.length) {
    //   mergedPosts.push(promotedPosts[promotedIndex]);
    //   promotedIndex++;
    // }

    return mergedPosts;
  };

  return (
    <>
      {topPostsData ? (
        topPostsData.length === 0 ? (
          <div className="h-96 w-full flex flex-col items-center justify-center">
            <h1 className="text-white font-bold">
              No posts to show from followers!
            </h1>
          </div>
        ) : (
          <>
            {filteredPosts && (
              <>
                {mergePosts(filteredPosts, promotedPosts || []).map(
                  (postData) =>
                    postData && (
                      <FeedPost
                        key={`${postData._id}FromAdsService:${postData?.fromAdsService}`}
                        postData={postData}
                        currUserData={currUserData}
                      />
                    )
                )}
              </>
            )}
            {otherPosts && otherPosts.length > 0 && (
              <>
                <div className="w-full flex items-center justify-center">
                  <h2 className="text-white text-2xl font-bold p-4">
                    Suggested Posts
                  </h2>
                </div>
                {mergePosts(otherPosts, promotedPosts || []).map(
                  (postData) =>
                    postData && (
                      <FeedPost
                        key={`${postData._id}FromAdsService:${postData?.fromAdsService}`}
                        postData={postData}
                        currUserData={currUserData}
                      />
                    )
                )}
              </>
            )}
          </>
        )
      ) : (
        <FeedPostSkeleton />
      )}
    </>
  );
}

export default Feed;
