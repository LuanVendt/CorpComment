import { ContainerProps } from "../../lib/types";
import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";

export default function Container({
  feedBackItems,
  isLoading,
  error,
  onAddFeedback,
}: ContainerProps) {
  return (
    <main className="container">
      <Header onAddFeedback={onAddFeedback} />
      <FeedbackList
        feedBackItems={feedBackItems}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
}
