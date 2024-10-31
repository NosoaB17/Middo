import { DiscussionContextProvider } from "../../../contexts/DiscussionContext";
import DiscussionContent from "./Discussion/DiscussionContent";

const Discussion = ({ messageId, onClose }) => {
  return (
    <DiscussionContextProvider messageId={messageId}>
      <DiscussionContent onClose={onClose} />
    </DiscussionContextProvider>
  );
};

export default Discussion;
