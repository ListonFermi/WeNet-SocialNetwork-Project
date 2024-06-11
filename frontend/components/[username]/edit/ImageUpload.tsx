"use client";
import React, { useState } from "react";
import AddImage from "./AddImage";
import CropImage from "./CropImage";

function ImageUpload() {
  const [page, setPage] = useState("add");

  if (page === "crop") return <CropImage />;
  else return <AddImage setPage={setPage} />;
}

export default ImageUpload;
