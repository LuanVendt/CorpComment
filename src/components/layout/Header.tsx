import useFeedbackItemsStore from "../../stores/feedbackItemsStore";
import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

export default function Header() {
  const onAddFeedback = useFeedbackItemsStore((state) => state.addFeedback);

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddFeedback={onAddFeedback} />
    </header>
  );
}
