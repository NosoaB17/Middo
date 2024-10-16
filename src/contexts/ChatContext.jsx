import { createContext, useContext, useReducer, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    conversations: [],
    messages: [],
    searchResults: [],
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          ...state,
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case "SET_CONVERSATIONS":
        return {
          ...state,
          conversations: action.payload,
        };
      case "SET_MESSAGES":
        return {
          ...state,
          messages: action.payload,
        };
      case "SET_SEARCH_RESULTS":
        return {
          ...state,
          searchResults: action.payload,
        };
      case "CLEAR_SEARCH_RESULTS":
        return {
          ...state,
          searchResults: [],
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  useEffect(() => {
    if (currentUser?.uid) {
      const unsubUserChats = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          if (doc.exists()) {
            const conversationsData = doc.data();
            const conversations = Object.entries(conversationsData).map(
              ([id, data]) => ({
                id,
                ...data,
                userInfo: {
                  uid:
                    id.split(currentUser.uid)[0] ||
                    id.split(currentUser.uid)[1],
                  // Chúng ta không có displayName và photoURL trong dữ liệu này
                },
                lastMessage: data.lastMessage,
                date: data.date,
              })
            );
            dispatch({ type: "SET_CONVERSATIONS", payload: conversations });
          }
        }
      );

      return () => unsubUserChats();
    }
  }, [currentUser]);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatContextProvider");
  }
  return context;
};
