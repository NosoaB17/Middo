import { createContext, useContext, useReducer, useEffect } from "react";
import { ChatContext } from "./ChatContext";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

export const DiscussionContext = createContext();

export const DiscussionContextProvider = ({ children, messageId }) => {
  const { data: chatData } = useContext(ChatContext);

  const INITIAL_STATE = {
    originMessage: null,
    replies: [],
    isLoading: true,
  };

  const discussionReducer = (state, action) => {
    switch (action.type) {
      case "SET_ORIGIN_MESSAGE":
        return {
          ...state,
          originMessage: action.payload,
          isLoading: false,
        };
      case "SET_REPLIES":
        return {
          ...state,
          replies: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(discussionReducer, INITIAL_STATE);

  // Fetch origin message
  useEffect(() => {
    if (!messageId || !chatData.chatId || chatData.chatId === "null") return;

    const getOriginMessage = async () => {
      try {
        const messageRef = doc(
          db,
          "chats",
          chatData.chatId,
          "messages",
          messageId
        );
        const messageSnap = await getDoc(messageRef);

        if (messageSnap.exists()) {
          // Fetch user info for the message
          const userRef = doc(db, "users", messageSnap.data().senderId);
          const userSnap = await getDoc(userRef);

          dispatch({
            type: "SET_ORIGIN_MESSAGE",
            payload: {
              id: messageSnap.id,
              ...messageSnap.data(),
              userInfo: userSnap.exists() ? userSnap.data() : null,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching origin message:", error);
      }
    };

    getOriginMessage();
  }, [messageId, chatData.chatId]);

  // Listen to replies
  useEffect(() => {
    if (!messageId || !chatData.chatId || chatData.chatId === "null") return;

    const q = query(
      collection(
        db,
        "chats",
        chatData.chatId,
        "messages",
        messageId,
        "replies"
      ),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const replies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: "SET_REPLIES", payload: replies });
    });

    return () => unsubscribe();
  }, [messageId, chatData.chatId]);

  return (
    <DiscussionContext.Provider value={{ data: state, dispatch }}>
      {children}
    </DiscussionContext.Provider>
  );
};

export const useDiscussion = () => {
  const context = useContext(DiscussionContext);
  if (!context) {
    throw new Error(
      "useDiscussion must be used within DiscussionContextProvider"
    );
  }
  return context;
};
