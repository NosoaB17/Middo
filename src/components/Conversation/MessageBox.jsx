import Header from "./MessageBox/Header";
import MessageList from "./MessageBox/MessageList";
import InputBox from "./MessageBox/InputBox";

const MessageBox = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <MessageList />
      <InputBox />
    </div>
  );
};

export default MessageBox;
