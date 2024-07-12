import Navbar from "@/components/Navbar";
import FeedLeftDiv from "@/components/feed/FeedLeftDiv";
import PaymentCompleted from "@/components/post/promote/[id]/paymentCompleted/PaymentCompleted";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

function page( ) {

  return (
    <div className="max-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="relative flex-1 hidden md:block bg-feedBg">
          <FeedLeftDiv />
        </div>
        <div className="flex-1 md:flex-2 lg:flex-3 xl:flex-4 h-screen overflow-y-auto no-scrollbar bg-feedBg">
            <PaymentCompleted/>
        </div>
        <div className="relative flex-1 hidden md:block bg-feedBg"></div>
      </div>
    </div>
  );
}

export default page;
