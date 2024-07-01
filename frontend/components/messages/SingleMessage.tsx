import React from "react";
import OwnMessage from "./OwnMessage";
import RecievedMessage from "./RecievedMessage";
import { IUser } from "@/types/types";

type props = {
  currUser: IUser;
  senderId: { _id: string; username: string; profilePicUrl: string };
  message: string;
  timestamp: string;
};

function SingleMessage(props: props) {
  console.log('from singleMsg comp')
  console.log({props})
  const { currUser, senderId, message, timestamp } = props;
  const isOwnMessage = currUser?._id === senderId._id;

  if (isOwnMessage) {
    return <OwnMessage message={message} timestamp={timestamp} />;
  } else {
    const { username, profilePicUrl } = senderId;
    return (
      <RecievedMessage
        username={username}
        profilePicUrl={profilePicUrl}
        message={message}
        timestamp={timestamp}
      />
    );
  }
}

export default SingleMessage;
