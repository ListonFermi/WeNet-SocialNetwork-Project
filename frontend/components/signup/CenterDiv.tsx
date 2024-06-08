"use client";
import React, { useState } from "react";
import SignupForm from "@/components/signup/SignupForm";
import VerifyUserForm from "@/components/signup/VerifyUserForm";
import VerifyOTP from "./VerifyOTP";

function CenterDiv() {
  const [isVerifyForm, setIsVerifyForm] = useState(false);
  const [isVerifyOTPComp, setIsVerifyOTPComp] = useState(false);

  const verifyUserComponent = isVerifyOTPComp ? <VerifyOTP/> : <VerifyUserForm setIsVerifyOTPComp={setIsVerifyOTPComp}  /> 

  return isVerifyForm ? verifyUserComponent : <SignupForm setIsVerifyForm={setIsVerifyForm} />;
}

export default CenterDiv;
