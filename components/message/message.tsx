import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import AssistantIcon from "../ui/assistant-icon";

export interface MessageTypes {
  id?: string;
  role: "user" | "assistant";
  content: string;
}

export const Message = ({ role, content }: MessageTypes) => {
  const { user } = useUser();

  return (
    <div className={`grid grid-cols-[30px_1fr] gap-5 p-5 ${role === "assistant" ? "bg-gray-600" : ""}`}>
      {role === "user" ? (
        <div>
          <Image
            src={user.picture}
            width={30}
            height={30}
            alt="User avatar"
            className="rounded-sm shadow-md shadow-black/50"
          />
        </div>
      ) : (
        <AssistantIcon />
      )}
      <div>{content}</div>
    </div>
  );
};
