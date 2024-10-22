import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { DiscussionContext } from "../../../contexts/DiscussionContext";
import MessageItem from "./MessageItem";

const ReplyList = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(DiscussionContext);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data.replies]);

  const formatTime = (date) => {
    if (!date) return "";
    return new Date(date.toDate()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-2 p-3">
      {data.replies.map((reply) => (
        <MessageItem
          key={reply.id}
          message={reply}
          isCurrentUser={reply.senderId === currentUser.uid}
          isRemoved={reply.isRemoved}
          isHovered={false}
          isSelected={false}
          onMessageClick={() => {}}
          formatTime={formatTime}
          showActions={false}
        />
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default ReplyList;
