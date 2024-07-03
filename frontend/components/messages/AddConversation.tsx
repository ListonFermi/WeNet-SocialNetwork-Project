import React from "react";

function AddConversation() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="text-white font-bold p-2">Select a conversation to start</h1>
      <h1 className="text-white font-bold p-2">Or</h1>
      <button className="p-2 bg-rootBg hover:bg-rootBgH text-black font-bold rounded-lg">
        Start a conversation
      </button>
    </div>
  );
}

export default AddConversation;
