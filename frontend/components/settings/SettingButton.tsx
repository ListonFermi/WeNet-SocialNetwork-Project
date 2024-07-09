"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

interface SettingButtonProps {
  settingName: string;
  iconName: string;
}

function SettingButton(props: SettingButtonProps): JSX.Element {
  const { settingName, iconName } = props;

  const searchParams = useSearchParams();

  const router = useRouter()

  const settingNameQuery = searchParams.get("settingNameQuery");
  let selected
  if (!settingNameQuery) selected = 'changePassword'
  else selected = settingNameQuery

  return (
    <button
      onClick={()=>router.push(`/settings?settingNameQuery=${iconName}`)}
      className={`flex justify-center items-center  p-2 hover:rounded-lg mb-4 ${
        selected === iconName
          ? "bg-rootBgH rounded-lg"
          : "hover:bg-secColorH"
      } `}
    >
      <Image src={`/icons/${iconName}.svg`} height={24} width={24} alt="icon" />
      <h1
        className={`text-white font-${
          selected === settingName ? "bold" : "semibold"
        } text-lg px-4 hidden md:block`}
      >
        {settingName}
      </h1>
    </button>
  );
}

export default SettingButton;
