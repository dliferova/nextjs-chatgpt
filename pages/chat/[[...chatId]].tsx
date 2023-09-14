import React, { useState } from "react";
import Head from "next/head";
import { ChatSidebar } from "../../components/chatSidebar";
import { streamReader } from "openai-edge-stream";

const ChatPage = () => {
  const [incomingMessage, setIncomingMessage] = useState("")
  const [messageText, setMessageText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/chat/sendMessage`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(({message: messageText}))
    });

    const data = response.body;

    if (!data) {
      return;
    }

    const reader = data.getReader();

    await streamReader(reader, (message) => {
      setIncomingMessage(s => `${s}${message.content}`)
    })
  };

  return (
    <>
      <Head>
        <title>New chat</title>
      </Head>
      <div className="grid h-screen grid-cols-[260px_1fr] ">
        <ChatSidebar />
        <div className="flex flex-col bg-gray-700">
          <div className="flex-1 text-white">{incomingMessage}</div>
          <footer className="bg-gray-800 p-10">
            <form onSubmit={handleSubmit}>
              <fieldset className="flex gap-2">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full resize-none rounded-md bg-gray-700 p-2 text-white focus:border-emerald-500 focus:bg-gray-600 focus:outline focus:outline-emerald-500"
                  placeholder="Send message..."
                />
                <button type="submit" className="btn">Submit</button>
              </fieldset>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
