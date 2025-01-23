export type TFeedbackItem = {
  id: string;
  upvoteCount: number;
  badgeLetter: string;
  company: string;
  text: string;
  daysAgo: number;
};

export type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

export type ContainerProps = {
  feedBackItems: TFeedbackItem[];
  isLoading: boolean;
  error: string;
  onAddFeedback: (text: string) => void;
};

export type FeedbackListProps = {
  feedBackItems: TFeedbackItem[];
  isLoading: boolean;
  error: string;
};

export type HeaderProps = {
  onAddFeedback: (text: string) => void;
};

export type FeedbackFormProps = {
  onAddFeedback: (text: string) => void;
};

export type HashTagListProps = {
  companies: string[];
  handleSelectCompany: (company: string) => void;
};

export type HashTagItemProps = {
  company: string;
  onSelectCompany: (company: string) => void;
};
