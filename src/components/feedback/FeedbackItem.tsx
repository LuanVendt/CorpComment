import { TriangleUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { FeedbackItemProps } from "../../lib/types";

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);
  const [isUpvoted, setIsUpvoted] = useState(false);

  const handleOnClick = () => setOpen((prev) => !prev);

  const handleUpvoteClick = () => {
    setUpvoteCount((prev) => ++prev);
    setIsUpvoted(true);
  };

  return (
    <li className={`feedback ${open ? "feedback--expand" : ""}`}>
      <button onClick={handleUpvoteClick} disabled={isUpvoted}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>

      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div onClick={handleOnClick}>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>{feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
}
