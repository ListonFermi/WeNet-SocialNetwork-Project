import React from "react";

type props = {
  username: string;
  profilePicUrl: string;
  message: string;
  timestamp: string;
};

function RecievedMessage(props: props) {
  const { profilePicUrl, message } = props;
  let { timestamp } = props;




  return <div className="bg-secColor">{message}</div>;
}

export default RecievedMessage;
