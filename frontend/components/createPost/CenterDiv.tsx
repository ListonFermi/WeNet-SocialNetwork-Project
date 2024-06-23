'use client'
import React, { useEffect, useState } from "react";
import CropImage from "./CropImage";
import AddCaption from "./AddCaption";

function CenterDiv() {
  const [isCaptionPage, setIsCaptionPage] = useState(false);
  const [postData, setPostData] = useState(null);  //this will get the postId

  return isCaptionPage && postData ? (
    <AddCaption postData={postData} />
  ) : (
    <CropImage setIsCaptionPage={setIsCaptionPage} setPostData={setPostData} />
  );
}

export default CenterDiv;
