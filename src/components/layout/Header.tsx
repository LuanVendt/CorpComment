import { useFeedbackItemsContext } from "../../hooks/hooks";
import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

export default function Header() {
  const { onAddFeedback } = useFeedbackItemsContext();

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddFeedback={onAddFeedback} />
    </header>
  );
}
