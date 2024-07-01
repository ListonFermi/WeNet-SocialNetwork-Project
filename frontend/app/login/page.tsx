import LoginForm from "@/components/login/LoginForm";
import Navbar from "@/components/Navbar";
import LeftDiv from "@/components/page/LeftDiv";
import RightDiv from "@/components/page/RightDiv";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  return (
    <div className="max-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1 hidden md:block bg-gray-800">
          <LeftDiv />
        </div>
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 p-4 h-screen overflow-y-auto no-scrollbar bg-secColor">
          <LoginForm />
        </div>
        <div className="relative flex-1 hidden md:block bg-gray-800">
          <RightDiv />
        </div>
      </div>
    </div>
  );
}

export default Login;
