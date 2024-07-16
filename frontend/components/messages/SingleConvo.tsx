"use client";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SingleMessage from "./SingleMessage";
import { IUser } from "@/types/types";
import messageService from "@/utils/apiCalls/messageService";
import AddConversation from "./AddConversation";
import { useSocket } from "../redux/SocketProvider";
import { ChatEventEnum } from "@/redux/constants";
import EmojiPicker from "emoji-picker-react";

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

  const [emojiOpen, setEmojiOpen] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        if (!convoId) return alert("select a conversation");
        const messages = await messageService.getConvoMessages(convoId);
        setMessages(messages);
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, [searchParams]);

  useEffect(() => {
    if (!socket) return;

    socket.on(ChatEventEnum.MESSAGE_RECEIVED_EVENT, onMessageReceived);

    return () => {
      socket.off(ChatEventEnum.MESSAGE_RECEIVED_EVENT, onMessageReceived);
    };
  }, [socket]);

  const convoId = searchParams.get("convoId");
  if (!convoId) return <AddConversation />;

  async function handleSubmitMessageSend(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

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

  function handleOnEmojiClick(emojiObject: any) {
    console.log(emojiObject);
    setMessage((str) => str + emojiObject.emoji);
  }

  function onMessageReceived(latestMessage: Message) {
    console.log("wenet message from socket");
    setMessages((messages) => [latestMessage, ...messages]);
  }

  return (
    <div className="h-full w-full">
      <div className="h-[10%] w-full border-b-2"></div>
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

      <div className="relative w-full flex items-center h-[10%]">
        {emojiOpen && (
          <div className="absolute bottom-full mb-2 left-0 z-10">
            <EmojiPicker onEmojiClick={handleOnEmojiClick} />
          </div>
        )}
        <div className="flex justify-end w-[10%]">
          <button
            onClick={() => setEmojiOpen((state) => !state)}
            className="text-xl"
          >
            😃
          </button>
        </div>
        <form
          className="h-full w-[90%] flex items-center justify-center mt-2"
          onSubmit={handleSubmitMessageSend}
        >
          <input
            type="text"
            placeholder="Type your message here"
            name="message"
            value={message}
            onChange={handleOnMessageChange}
            className="p-4 w-[90%] bg-secColor text-white border-none rounded-l-lg"
          />
          <button
            type="submit"
            className="p-4 w-[10%] bg-rootBg text-white font-bold rounded-r-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default SingleConvo;
