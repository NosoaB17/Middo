import Header from "./MessageBox/Header";
import MessageList from "./MessageBox/MessageList";
import InputBox from "./MessageBox/InputBox";

const MessageBox = () => {
  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden rounded-lg bg-card md:rounded-none">
      <Header />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <MessageList />
        <InputBox />
      </div>
    </div>
  );
};

export default MessageBox;
