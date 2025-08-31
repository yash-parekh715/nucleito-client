import React from "react";
import { ChatInterface } from "@/components/chat-interface";

function chat() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <ChatInterface />
    </div>
  );
}

export default chat;
