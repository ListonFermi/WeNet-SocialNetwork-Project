import React from "react";
import OwnMessage from "./OwnMessage";
import RecievedMessage from "./RecievedMessage";
import { IUser } from "@/types/types";

type props = {
  currUser: IUser;
  sender: { _id: string; username: string; profilePicUrl: string };
  message: string;
  timestamp: string;
};

function SingleMessage(props: props) {

  const { currUser, sender, message, timestamp } = props;

  if(!currUser) return <h1>Loading2</h1>
  const isOwnMessage = currUser?._id === sender._id;

  if (isOwnMessage) {
    return <OwnMessage message={message} timestamp={timestamp} />;
  } else {
    const { username, profilePicUrl } = sender;
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
