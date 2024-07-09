'use client'
import { useParams } from "next/navigation";
import React from "react";

function Promote() {
  const { id } = useParams<{ id: string }>();
  // console.log({ id });

  return <div></div>;
}

export default Promote;
