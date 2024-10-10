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
    searchResults: null,
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
      case "SET_SEARCH_RESULTS":
        return {
          ...state,
          searchResults: action.payload,
        };
      case "CLEAR_SEARCH_RESULTS":
        return {
          ...state,
          searchResults: null,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  useEffect(() => {
    if (currentUser?.uid) {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          const conversations = Object.entries(doc.data())
            .map(([chatId, data]) => ({
              id: chatId,
              ...data,
            }))
            .sort((a, b) => b.date - a.date);
          dispatch({ type: "SET_CONVERSATIONS", payload: conversations });
        }
      });

      return () => unsub();
    }
  }, [currentUser]);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
