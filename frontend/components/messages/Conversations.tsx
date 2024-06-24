import React from "react";
import Convo from "./Convo";

function Conversations() {
  const convos = ["dafdf", "adfad2f5ad", "adfad4fadf"];

  return (
    <>
      <div className="h-[10%] flex items-center justify-center">
        <h1 className="text-white font-bold text-2xl">Conversations</h1>
      </div>
      <div className="w-full bg-fuchsia-600 h-full overflow-y-auto no-scrollbar">
        {convos.map((id) => (
          <Convo convoId={id} key={id} />
        ))}
      </div>
    </>
  );
}

export default Conversations;
