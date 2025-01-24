import useFeedbackItemsStore from "../../stores/feedbackItemsStore";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";
import FeedbackItem from "./FeedbackItem";

export default function FeedbackList() {
  const filteredFeedbackItems = useFeedbackItemsStore(
    (state) => state.getFilteredFeedbackItems()
  );
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const error = useFeedbackItemsStore((state) => state.error);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {error && <ErrorMessage error={error} />}

      {filteredFeedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
