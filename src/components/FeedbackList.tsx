import { FeedbackListProps } from "../lib/types";
import ErrorMessage from "./ErrorMessage";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";

export default function FeedbackList({
  feedBackItems,
  isLoading,
  error,
}: FeedbackListProps) {
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {error && <ErrorMessage error={error} />}

      {feedBackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
