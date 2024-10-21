// Discussion.jsx
import React, { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const Discussion = ({ messageId, onClose }) => {
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const q = query(
      collection(db, "discussions"),
      where("messageId", "==", messageId),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReplies(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [messageId]);

  const handleSendReply = async () => {
    if (newReply.trim()) {
      await addDoc(collection(db, "discussions"), {
        messageId,
        text: newReply,
        senderId: currentUser.uid,
        createdAt: new Date(),
      });
      setNewReply("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-3/4 h-3/4 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Discussion</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {replies.map((reply) => (
            <div key={reply.id} className="mb-4 p-2 bg-gray-100 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <strong>
                  {reply.senderId === currentUser.uid ? "You" : "Other"}
                </strong>
                <span className="text-xs text-gray-500">
                  {reply.createdAt.toDate().toLocaleString()}
                </span>
              </div>
              <p>{reply.text}</p>
            </div>
          ))}
        </div>
        <div className="border-t p-4 flex">
          <input
            type="text"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            className="flex-grow border rounded-l-lg px-4 py-2"
            placeholder="Type your reply..."
          />
          <button
            onClick={handleSendReply}
            className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
