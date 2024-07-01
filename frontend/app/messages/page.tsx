import ConvoList from "@/components/messages/ConvoList";
import MobileView from "@/components/messages/MobileView";
import SingleConvo from "@/components/messages/SingleConvo";
import { sampleUser } from "@/components/messages/temp";
import React from "react";

export default function MessagesPage() {
  let currUser= sampleUser;
  return (
    <div className="max-h-screen w-full bg-red-300 flex">
      <div className="max-h-screen w-[30%] hidden md:block">
        <ConvoList />
      </div>
      <div className="h-full w-[70%] hidden md:block">
        <SingleConvo currUser={currUser}/>
      </div>
      <MobileView />
    </div>
  );
}
