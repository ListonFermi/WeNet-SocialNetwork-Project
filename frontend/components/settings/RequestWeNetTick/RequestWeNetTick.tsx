"use client";
import React, { useEffect, useState } from "react";
import IsApprovedComponent from "./isApproved";
import IsPendingComponent from "./isPending";
import IsRejectedComponent from "./isRejected";
import RequestModal from "./RequestModal";
import userService from "@/utils/apiCalls/userService";

function RequestWeNetTick() {
  const [hasRequested, setHasRequested] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [changed, setChanged ] =useState(false)

  useEffect(() => {
    (async function () {
      try {
        const { hasRequestedTick, status } = await userService.hasRequestedTick();
        setHasRequested(hasRequestedTick);
        
        if (hasRequestedTick) setStatus(status);
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="font-bold text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-[25%] flex items-center justify-center">
        <h1 className="font-bold text-white text-xl">Request for WeNet Tick</h1>
      </div>
      {hasRequested ? (
        <>
          {status === "approved" && <IsApprovedComponent />}
          {status === "pending" && <IsPendingComponent />}
          {status === "rejected" && <IsRejectedComponent />}
        </>
      ) : (
        <div className="w-full h-[75%] flex flex-col items-center justify-center">
          <div className="w-full h-[50%] flex items-center justify-center">
            <h1 className="font-semibold text-white">
              Submit your documents:{" "}
            </h1>
          </div>
          <div className="w-full h-[50%] flex items-center justify-center">
            <RequestModal />
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestWeNetTick;
