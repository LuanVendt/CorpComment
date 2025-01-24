import { createContext, useContext, useEffect, useState } from "react";
import { FEEDBACKS_URL } from "../lib/constants";
import { TFeedbackItem, TFeedbackItemsContext } from "../lib/types";

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);

  if (!context) throw new Error("FeedbackItemsContext is not defined");

  return context;
}

export function useFeedBackItems() {
  const [feedBackItems, setFeedBackItems] = useState<TFeedbackItem[]>([]);
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

  return {
    feedBackItems,
    setFeedBackItems,
    isLoading,
    error,
  };
}
