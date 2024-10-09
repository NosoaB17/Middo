import React from "react";
import MessageArea from "./Chat/MessageArea";
import InputBox from "./Chat/InputBox";

const Chat = () => {
  return (
    <div className="flex-1">
      <div className="bg-blue-600 text-white p-4">
        <span>Selected User Name</span>
      </div>
      <MessageArea />
      <InputBox />
    </div>
  );
};

export default Chat;
