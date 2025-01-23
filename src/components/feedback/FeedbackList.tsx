import { FeedbackListProps } from "../../lib/types";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";
import FeedbackItem from "./FeedbackItem";

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
