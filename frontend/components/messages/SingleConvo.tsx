"use client";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import sampleConversations, { sampleMsgData } from "./temp";
import SingleMessage from "./SingleMessage";
import { IUser } from "@/types/types";
import messageService from "@/utils/apiCalls/messageService";
import AddConversation from "./AddConversation";
import { useSocket } from "../redux/SocketProvider";
import { ChatEventEnum } from "@/redux/constants";

interface Message {
  _id: string;
  convoId: string;
  sender: any;
  message: string;
  isAttachment: boolean;
  attachmentUrl?: string;
  updatedAt: string;
}

function SingleConvo({ currUser }: { currUser: IUser }) {
  const searchParams = useSearchParams();

  const socket = useSocket();

  const [messages, setMessages] = useState<Message[]>([]); //to store messaages in the convo

  const [message, setMessage] = useState(""); //to store message in the input tag

  const convoId = searchParams.get("convoId");
  if (!convoId) return <AddConversation />;

  async function getMessages() {
    try {
      if (!convoId) return alert("select a conversation");
      const messages = await messageService.getConvoMessages(convoId);
      setMessages(messages);
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function handleSubmitMessageSend(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault(); // Prevent page reload

      const formData = new FormData(event.currentTarget);
      // Convert form data to a plain object, if needed
      const data = Object.fromEntries(formData.entries());

      if (!convoId) return alert("select a conversation");
      const latestMessage = await messageService.sendMessage(convoId, formData);
      setMessages((messages) => [latestMessage, ...messages]);
      setMessage("");
    } catch (error: any) {
      alert(error.message);
    }
  }

  function handleOnMessageChange(e: ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  function onMessageReceived(latestMessage: Message) {
    console.log("wenet message from socket");
    console.log({ message });
    setMessages((messages) => [latestMessage, ...messages]);
  }

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on(ChatEventEnum.MESSAGE_RECEIVED_EVENT, onMessageReceived);

    return () => {
      socket.off(ChatEventEnum.MESSAGE_RECEIVED_EVENT, onMessageReceived);
    };
  }, [socket]);

  return (
    <div className="h-full w-full">
      <div className="h-[10%] w-full bg-black">
        <h1 className="h-full w-full flex items-center justify-center font-bold text-xl text-white">
          {/* {username} */}
        </h1>
      </div>
      <div className="h-[80%] flex flex-col-reverse overflow-y-auto no-scrollbar">
        {/* SingleMessage currUserId senderId  message timestamp   */}
        {messages.length &&
          messages?.map((msg, index) => {
            const { _id, sender, message, updatedAt } = msg;
            return (
              <SingleMessage
                key={_id}
                currUser={currUser}
                sender={sender}
                message={message}
                timestamp={updatedAt}
              />
            );
          })}
      </div>
      <div className="h-[10%] w-full  flex justify-center">
        <form
          className="h-full w-full flex items-center justify-center"
          onSubmit={handleSubmitMessageSend}
        >
          <input
            type="text"
            placeholder="Type your message here"
            name="message"
            value={message}
            onChange={handleOnMessageChange}
            className="p-4 w-[75%] bg-secColor text-white border-none rounded-l-lg"
          />
          <button
            type="submit"
            className="p-4 bg-rootBg text-white font-bold rounded-r-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default SingleConvo;
