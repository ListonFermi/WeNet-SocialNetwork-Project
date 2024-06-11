"use client";
import Image from "next/image";
import React from "react";

interface SettingButtonProps {
  settingName: string;
  iconName: string;
  clickSetterFunction: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
}

function SettingButton(props: SettingButtonProps): JSX.Element {
  const { settingName, iconName, clickSetterFunction, selected } = props;
  return (
    <button
      onClick={() => clickSetterFunction(settingName)}
      className={`flex justify-center items-center  p-2 hover:rounded-lg mb-4 ${
        selected === settingName
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
