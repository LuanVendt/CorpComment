import { HeaderProps } from "../lib/types";
import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Pattern from "./Pattern";

export default function Header({ onAddFeedback }: HeaderProps) {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddFeedback={onAddFeedback} />
    </header>
  );
}
