// MessageBox.jsx
import { useContext } from "react";
import Header from "./MessageBox/Header";
import MessageList from "./MessageBox/MessageList";
import InputBox from "./MessageBox/InputBox";
import { ChatContext } from "../../contexts/ChatContext";

const MessageBox = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden rounded-lg bg-card md:rounded-none">
      {data.chatId !== "null" ? (
        <>
          <Header />
          <div className="relative flex flex-1 flex-col overflow-hidden">
            <MessageList />
            <InputBox />
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-500">
            Select a conversation to start chatting
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
