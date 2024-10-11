import { createContext, useContext, useReducer, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  onSnapshot,
  doc,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    conversations: [],
    messages: [],
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          ...state,
          user: action.payload,
          chatId: action.payload.chatId,
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
            const conversations = Object.entries(doc.data()).map(
              ([id, data]) => ({
                id,
                ...data,
              })
            );
            dispatch({ type: "SET_CONVERSATIONS", payload: conversations });
          }
        }
      );

      return () => unsubUserChats();
    }
  }, [currentUser]);

  useEffect(() => {
    if (state.chatId !== "null") {
      const q = query(
        collection(db, "chats", state.chatId, "messages"),
        orderBy("date", "asc")
      );
      const unsubMessages = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: "SET_MESSAGES", payload: messages });
      });

      return () => unsubMessages();
    }
  }, [state.chatId]);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
