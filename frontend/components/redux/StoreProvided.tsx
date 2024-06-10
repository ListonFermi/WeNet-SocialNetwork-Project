"use client";
import appStore from "@/redux/appStore";
import React from "react";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

function StoreProvided({ children }: { children: React.ReactNode }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  if(!googleClientId.length) console.error('Failed to get Google client Id')
  return (
    <Provider store={appStore}>
      <GoogleOAuthProvider clientId={googleClientId}>
        {children}
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default StoreProvided;
