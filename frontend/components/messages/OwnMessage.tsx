import { formatDate } from "@/utils/formatString";
import React from "react";

type props ={
    message: string;
    timestamp: string;
}

function OwnMessage({message, timestamp}: props) {

    timestamp = formatDate(timestamp)


  return (
    <div className="bg-rootBg">
    </div>
  );
}

export default OwnMessage;
