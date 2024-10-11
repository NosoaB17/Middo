import { useState, useContext } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";

const InputBox = () => {
  const [message, setMessage] = useState("");
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSend = async () => {
    if (message.trim() && data.chatId !== "null") {
      const messageData = {
        text: message,
        senderId: currentUser.uid,
        date: serverTimestamp(),
      };

      try {
        await addDoc(
          collection(db, "chats", data.chatId, "messages"),
          messageData
        );
        setMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="material-icons">send</span>
        </button>
      </div>
    </div>
  );
};

export default InputBox;
