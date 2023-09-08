import React, { useState } from "react";
import Head from "next/head";
import { ChatSidebar } from "../../components/chatSidebar";

const ChatPage = () => {
  const [messageText, setMessageText] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Message text: ", messageText);
  };

  return (
    <>
      <Head>
        <title>New chat</title>
      </Head>
      <div className="grid h-screen grid-cols-[260px_1fr] ">
        <ChatSidebar />
        <div className="flex flex-col bg-gray-700">
          <div className="flex-1">chat window</div>
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
