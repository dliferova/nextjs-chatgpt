import React, { useState } from "react";
import Head from "next/head";
import { ChatSidebar } from "../../components/chatSidebar";
import { streamReader } from "openai-edge-stream";
import { v4 as uuid } from "uuid";
import { Message } from "../../components/message";
import { MessageTypes } from "../../components/message/message";

const ChatPage = () => {
  const [incomingMessage, setIncomingMessage] = useState("");
  const [messageText, setMessageText] = useState("");
  const [newChatMessages, setNewChatMessages] = useState<MessageTypes[]>([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewChatMessages((prevState) => {
      return [
        ...prevState,
        {
          id: uuid(),
          role: "user",
          content: messageText,
        },
      ];
    });
    const response = await fetch(`/api/chat/sendMessage`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ message: messageText }),
    });

    const data = response.body;

    if (!data) {
      return;
    }

    const reader = data.getReader();

    await streamReader(reader, (message) => {
      setIncomingMessage((s) => `${s}${message.content}`);
    });
  };

  return (
    <>
      <Head>
        <title>New chat</title>
      </Head>
      <div className="grid h-screen grid-cols-[260px_1fr] ">
        <ChatSidebar />
        <div className="flex flex-col bg-gray-700">
          <div className="flex-1 text-white">
            {newChatMessages.map((message) => (
              <Message
                key={message.id}
                role={message.role}
                content={message.content}
              />
            ))}
            {!!incomingMessage && (
              <Message role="assistant" content={incomingMessage} />
            )}
          </div>
          <footer className="bg-gray-800 p-10">
            <form onSubmit={handleSubmit}>
              <fieldset className="flex gap-2">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full resize-none rounded-md bg-gray-700 p-2 text-white focus:border-emerald-500 focus:bg-gray-600 focus:outline focus:outline-emerald-500"
                  placeholder="Send message..."
                />
                <button type="submit" className="btn">
                  Submit
                </button>
              </fieldset>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
