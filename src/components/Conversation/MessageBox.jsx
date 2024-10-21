import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import Header from "./MessageBox/Header";
import MessageList from "./MessageBox/MessageList";
import InputBox from "./MessageBox/InputBox";

const MessageBox = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden rounded-lg bg-card md:rounded-none mt-5">
      {data.chatId !== "null" ? (
        <>
          <Header />
          <div className="relative flex flex-1 flex-col overflow-hidden">
            <div className="relative flex h-full w-full flex-1 overflow-hidden">
              {" "}
              <MessageList />
            </div>
            <div className="relative w-full border-t p-2">
              <InputBox />
            </div>
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
