import React, { useState } from "react";
import FeedPostSkeleton from "../../FeedPostSkeleton";
import FeedPost from "../../FeedPost";

function Post() {
  const [loading, setLoading] = useState(false);
  const [ post, setPost ] = useState(null)

  return <>{loading ? <FeedPostSkeleton /> : <FeedPost />}</>;
}

export default Post;
