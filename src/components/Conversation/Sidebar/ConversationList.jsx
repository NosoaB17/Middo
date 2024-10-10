import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import PropTypes from "prop-types";

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

  return (
    <div
      className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
        isActive ? "bg-gray-200" : ""
      }`}
      onClick={() => onClick(item)}
    >
      <div className="flex-shrink-0 mr-3">
        <img
          src={userData.photoURL || "https://via.placeholder.com/40"}
          alt={userData.displayName}
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {userData.displayName}
        </h3>
        {!isSearchResult && (
          <p className="text-sm text-gray-500 truncate">
            {item.lastMessage?.text}
          </p>
        )}
      </div>
      {!isSearchResult && (
        <div className="flex-shrink-0 ml-2">
          <span className="text-xs text-gray-400">
            {item.date &&
              new Date(item.date.toDate()).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
          </span>
        </div>
      )}
    </div>
  );
};

ConversationItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userInfo: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }),
    lastMessage: PropTypes.shape({
      text: PropTypes.string,
    }),
    date: PropTypes.object,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isSearchResult: PropTypes.bool.isRequired,
};

const ConversationList = ({ activeTab }) => {
  const { data, dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = () => {
      if (!currentUser || !currentUser.uid) return; // Add this check

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
      // If it's a search result, create a new conversation
      // This part would depend on your app's logic for creating new conversations
      console.log("Create new conversation with:", item);
    } else {
      dispatch({ type: "CHANGE_USER", payload: item.userInfo });
    }
    dispatch({ type: "CLEAR_SEARCH_RESULTS" });
  };

  const itemsToDisplay = data.searchResults || conversations;

  return (
    <div className="h-full overflow-y-auto">
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
  );
};

ConversationList.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default ConversationList;
