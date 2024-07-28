"use client";
import appStore from "@/redux/appStore";
import React from "react";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SocketProvider from "./SocketProvider";
import { GOOGLE_CLIENT_ID } from "@/utils/constants";

function StoreProvider({ children }: { children: React.ReactNode }) {
  const googleClientId = GOOGLE_CLIENT_ID || "";
  if (!googleClientId.length) console.error("Failed to get Google client Id");

  return (
    <Provider store={appStore}>
      <SocketProvider >
        <GoogleOAuthProvider clientId={googleClientId}>
          {children}
        </GoogleOAuthProvider>
      </SocketProvider>
    </Provider>
  );
}

export default StoreProvider;
