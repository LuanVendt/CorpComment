import { createContext, useContext } from "react";
import { TFeedbackItemsContext } from "../lib/types";

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);

  if (!context) throw new Error("FeedbackItemsContext is not defined");

  return context;
}

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);
