'use client'
import appStore from "@/redux/appStore";
import React from "react";
import { Provider } from "react-redux";

function StoreProvided({ children }: { children: React.ReactNode }) {
  return <Provider store={appStore}>{children}</Provider>;
}

export default StoreProvided;
