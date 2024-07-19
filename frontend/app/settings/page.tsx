import React from "react";
import SettingsBar from "@/components/settings/SettingsBar";
import SettingSection from "@/components/settings/SettingSection";
import getUserData from "@/utils/getUserData";
import BottomNav from "@/components/feed/BottomNav";

function page() {
  let currUser;
  try {
    const { userData } = getUserData();
    if(!userData) throw new Error('userData Not found')
    currUser = userData
  } catch (error: any) {
    return <h1 >Loading</h1>
  }

  return (
    <div className="max-h-screen w-full bg-black flex">
      <div className="max-h-screen w-[30%] hidden md:block">
        <SettingsBar />
      </div>
      <div className="h-full w-[70%] hidden md:block">
        <SettingSection currUser={currUser}/>
      </div>
      {/* <MobileView currUser={currUser} /> */}
      <BottomNav/>
    </div>
  );
}

export default page;
