"use client";
import React from "react";
import SettingButton from "./SettingButton";
import Image from "next/image";
import { deleteCookie } from "@/utils/deleteCookie";
import { useRouter } from "next/navigation";
import AlertDialog from "./AlertDialog";

function SettingsBar() {
  const settings = [
    // ["Account Privacy", "accountPrivacy"],
    ["Change Password", "changePassword"],
    ["Blocked Users", "blockedUsers"],
    ["Account Type", "accountType"],  
  ];

  const router = useRouter();
  function handleLogout () {
    deleteCookie("token");
    router.replace("/");
  }

  return (
    <div className="h-full w-full bg-black">
      <div className="h-[20%] flex justify-center items-center">
        <h1 className="text-white font-bold text-2xl hidden md:block">
          Settings
        </h1>
      </div>
      <div className="h-[60%]  flex flex-col items-start px-[20%]">
        {settings.map((setting, index) => (
          <SettingButton
            key={`settings${index}`}
            settingName={setting[0]}
            iconName={setting[1]}
          />
        ))}
      </div>
      <div className="h-20% flex justify-center">
        <AlertDialog onConfirm={handleLogout} alert="You really wanna logout of Wenet ?">
          <button
            className="py-4 md:px-4 w-[75%] bg-red-700 flex justify-center items-center rounded-3xl hover:bg-red-500"
          >
            <Image
              src="/icons/logout.svg"
              width={24}
              height={24}
              alt="LogoutIcon"
            />
            <h1 className="text-white font-bold ml-2 hidden md:block">
              Logout
            </h1>
          </button>
        </AlertDialog>
      </div>
    </div>
  );
}

export default SettingsBar;
