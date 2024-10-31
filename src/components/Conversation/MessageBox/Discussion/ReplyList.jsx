import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { DiscussionContext } from "../../../../contexts/DiscussionContext";
import MessageItem from "../Message/MessageItem";
import "../../../../styles/scrollbar.css";

const ReplyList = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(DiscussionContext);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data.replies]);

  const formatDateTime = (date) => {
    if (!date || typeof date.toDate !== "function") return "";
    const messageDate = date.toDate();

    return messageDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const shouldShowNewTimestamp = (currentDate, previousDate) => {
    if (!currentDate || !previousDate) return true;
    const timeDiff =
      currentDate.toDate().getTime() - previousDate.toDate().getTime();
    return timeDiff >= 3600000; //
  };

  const getReplyWithTimestamp = () => {
    return data.replies.map((reply, index) => ({
      ...reply,
      showTimestamp: shouldShowNewTimestamp(
        reply.createdAt,
        index > 0 ? data.replies[index - 1].createdAt : null
      ),
    }));
  };

  const repliesWithTimestamps = getReplyWithTimestamp();

  return (
    <div className="flex flex-1 flex-col gap-2 p-3 custom-scrollbar">
      {repliesWithTimestamps.map((reply) => (
        <div key={reply.id}>
          {reply.showTimestamp && (
            <div className="my-2 flex items-center justify-center gap-3">
              <div className="h-[1px] flex-grow bg-gray-200"></div>
              <span className="text-xs font-light text-neutral-500 px-2">
                {formatDateTime(reply.createdAt)}
              </span>
              <div className="h-[1px] flex-grow bg-gray-200"></div>
            </div>
          )}
          <MessageItem
            message={reply}
            isCurrentUser={reply.senderId === currentUser.uid}
            isRemoved={reply.isRemoved}
            isHovered={false}
            isSelected={false}
            onMessageClick={() => {}}
            formatTime={formatDateTime}
            showActions={false}
          />
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

export default ReplyList;
