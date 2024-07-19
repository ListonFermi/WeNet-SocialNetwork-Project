'use client'
import { useSearchParams } from "next/navigation";
import React from "react";
import ChangePassword from "./ChangePassword";
import AccountType from "./AccountType";
import { IUser } from "@/types/types";
import BlockedUsers from "./BlockedUsers";

function SettingSection({ currUser }: { currUser: IUser }) {
  const searchParams = useSearchParams();

  const settingNameQuery = searchParams.get("settingNameQuery");
  let selected;
  if (!settingNameQuery) selected = "changePassword";
  else selected = settingNameQuery;

  if(selected === 'changePassword') return <ChangePassword/>
  else if(selected === 'blockedUsers') return <BlockedUsers/>;
  else if(selected === 'accountType') return <AccountType currUser={currUser}  />;
}

export default SettingSection;
