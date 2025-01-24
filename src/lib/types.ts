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

export type FeedbackFormProps = {
  onAddFeedback: (text: string) => void;
};

export type HashTagItemProps = {
  company: string;
  onSelectCompany: (company: string) => void;
};

export type TFeedbackItemsContext = {
  feedBackItems: TFeedbackItem[];
  isLoading: boolean;
  error: string;
  companyList: string[];
  onAddFeedback: (text: string) => void;
  onSelectCompany: (company: string) => void;
  filteredFeedbackItems: TFeedbackItem[];
};

export type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

export type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  error: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addFeedback: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};
