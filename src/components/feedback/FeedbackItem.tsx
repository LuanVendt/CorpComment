import { TriangleUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { FeedbackItemProps } from "../../lib/types";

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);

  const handleOnClick = () => setOpen((prev) => !prev);

  return (
    <li className={`feedback ${open ? "feedback--expand" : ""}`}>
      <button onClick={() => console.log("clicou")}>
        <TriangleUpIcon />
        <span>{feedbackItem.upvoteCount}</span>
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
