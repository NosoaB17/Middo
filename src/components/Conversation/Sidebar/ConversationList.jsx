import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import PropTypes from "prop-types";

// Hàm helper để định dạng thời gian
const formatTime = (date) => {
  const now = new Date();
  const messageDate = new Date(date);

  if (now.toDateString() === messageDate.toDateString()) {
    // Nếu là cùng ngày, hiển thị giờ
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    // Nếu khác ngày, hiển thị ngày tháng
    return messageDate.toLocaleDateString();
  }
};

const ConversationItem = ({ item, isActive, onClick, isSearchResult }) => {
  const [userData, setUserData] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isSearchResult) {
        setUserData(item);
      } else {
        const userId = item.userInfo.uid;
        if (userId !== currentUser.uid) {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }
      }
    };

    fetchUserData();
  }, [item, isSearchResult, currentUser]);

  if (!userData) return null;

  const isUnread = item.unread; // Giả sử có trường unread trong dữ liệu
  const isGroup = item.isGroup; // Giả sử có trường isGroup trong dữ liệu

  return (
    <div
      className={`group flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
        isActive ? "bg-blue-100" : ""
      }`}
      onClick={() => onClick(item)}
    >
      <div className="flex-shrink-0 mr-3 relative">
        {isGroup ? (
          <span className="material-icons-outlined text-gray-500">group</span>
        ) : (
          <img
            src={userData.photoURL || "https://via.placeholder.com/40"}
            alt={userData.displayName}
            className="w-10 h-10 rounded-full"
          />
        )}
        {userData.status === "online" && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
        )}
      </div>
      <div className="flex-grow min-w-0">
        <h3
          className={`text-sm font-semibold ${
            isUnread ? "text-black" : "text-gray-700"
          } truncate`}
        >
          {userData.displayName}
        </h3>
        <p
          className={`text-sm ${
            isUnread ? "text-black" : "text-gray-500"
          } truncate`}
        >
          {isSearchResult
            ? "Tap to chat"
            : `${currentUser.displayName}: ${item.lastMessage?.text}`}
        </p>
      </div>
      <div className="flex-shrink-0 ml-2 flex flex-col items-end">
        <span className="text-xs text-gray-400">
          {item.date && formatTime(item.date.toDate())}
        </span>
        {isUnread && (
          <span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
        )}
        {item.memberCount && (
          <span className="text-xs text-gray-400 mt-1">
            +{item.memberCount}
          </span>
        )}
      </div>
    </div>
  );
};

const ConversationList = ({ activeTab }) => {
  const { data, dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = () => {
      if (!currentUser || !currentUser.uid) return;

      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          const conversationsData = doc.data();
          const sortedConversations = Object.entries(conversationsData)
            .map(([id, conversation]) => ({
              id,
              ...conversation,
            }))
            .sort((a, b) => b.date - a.date);
          setConversations(sortedConversations);
        }
      });

      return () => unsub();
    };

    getConversations();
  }, [currentUser]);

  const handleSelectItem = (item) => {
    if (data.searchResults) {
      console.log("Create new conversation with:", item);
    } else {
      dispatch({ type: "CHANGE_USER", payload: item.userInfo });
    }
    dispatch({ type: "CLEAR_SEARCH_RESULTS" });
  };

  const itemsToDisplay = data.searchResults || conversations;

  return (
    <div className="no-scrollbar h-full overflow-y-auto">
      <div className="relative flex flex-col">
        {itemsToDisplay.map((item) => (
          <ConversationItem
            key={item.id}
            item={item}
            isActive={data.chatId === item.id}
            onClick={handleSelectItem}
            isSearchResult={!!data.searchResults}
          />
        ))}
      </div>
    </div>
  );
};

ConversationList.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default ConversationList;
