import Error404 from "@/components/Error404";
import MobileView from "@/components/messages/MobileView";
import SingleConvo from "@/components/messages/SingleConvo";
import { sampleUser } from "@/components/messages/temp";
import { IUser } from "@/types/types";
import getUserData from "@/utils/getUserData";
import React from "react";

export default function MessagesPage() {
  let currUser= sampleUser;
  // try {
  //   currUser = getUserData() as IUser;
  // } catch (error: any) {
  //   return <Error404 />;
  // }

  return (
    <>
      <div className="h-full w-[70%] hidden md:block">
        <SingleConvo currUser={currUser} />
      </div>
      <MobileView />
    </>
  );
}
