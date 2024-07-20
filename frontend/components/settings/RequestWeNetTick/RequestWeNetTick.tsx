import React from "react";
import IsApprovedComponent from "./isApproved";
import IsPendingComponent from "./isPending";
import IsRejectedComponent from "./isRejected";
import RequestModal from "./RequestModal";

function RequestWeNetTick() {
  const hasRequested = false;
  const isApproved = false;
  const isPending = false;
  const isRejected = true;

  return (
    <div className="w-full h-full">
      <div className="w-full h-[25%] flex items-center justify-center">
        <h1 className="font-bold text-white text-xl">Request for WeNet Tick</h1>
      </div>
      {hasRequested ? (
        <>
          {isApproved && <IsApprovedComponent />}
          {isPending && <IsPendingComponent />}
          {isRejected && <IsRejectedComponent />}
        </>
      ) : (
        <div className="w-full h-[75%] flex flex-col items-center justify-center">
          <div className="w-full h-[50%] flex items-center justify-center">
            <h1 className="font-semibold text-white">Submit your documents: </h1>
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
