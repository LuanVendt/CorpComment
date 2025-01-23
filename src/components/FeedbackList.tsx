import { useEffect, useState } from "react";
import { FEEDBACKS_URL } from "../lib/constants";
import ErrorMessage from "./ErrorMessage";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";

export default function FeedbackList() {
  const [feedBackItems, setFeedBackItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(FEEDBACKS_URL);

        if (!response.ok) throw new Error();

        const data = await response.json();

        setFeedBackItems(data.feedbacks);

        setIsLoading(false);
      } catch (error) {
        setError("Something went wrong. Please try again later.");

        setIsLoading(false);
      }
    };

    fetchFeedbackItems();
  }, []);

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
