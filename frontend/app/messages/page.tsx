import ConvoList from "@/components/messages/ConvoList";
import MobileView from "@/components/messages/MobileView";
import SingleConvo from "@/components/messages/SingleConvo";
import getUserData from "@/utils/getUserData";
import React from "react";

export default function MessagesPage() {
  let currUser;
  try {
    const { userData } = getUserData();
    if(!userData) throw new Error('userData Not found')
    currUser = userData
  } catch (error: any) {
    return <h1>Loading</h1>
  }


  return (
    <div className="max-h-screen w-full bg-black flex">
      <div className="max-h-screen w-[30%] hidden md:block">
        <ConvoList />
      </div>
      <div className="h-full w-[70%] hidden md:block">
        <SingleConvo currUser={currUser} />
      </div>
      <MobileView currUser={currUser} />
    </div>
  );
}
