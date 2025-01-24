import { useMemo, useState } from "react";
import { FeedbackItemsContext, useFeedBackItems } from "../hooks/hooks";
import { FEEDBACKS_URL } from "../lib/constants";
import { FeedbackItemsContextProviderProps, TFeedbackItem } from "../lib/types";

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const { feedBackItems, setFeedBackItems, isLoading, error } =
    useFeedBackItems();

  const [selectedCompany, setSelectedCompany] = useState("");

  const companyList = useMemo(
    () => [...new Set(feedBackItems.map((feedback) => feedback.company))],
    [feedBackItems]
  );

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedBackItems.filter(
            (feedback) => feedback.company === selectedCompany
          )
        : feedBackItems,
    [feedBackItems, selectedCompany]
  );

  const handleAddFeedback = (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);

    const badgeLetter = companyName?.substring(0, 1).toUpperCase();

    const newFeedback: TFeedbackItem = {
      id: Date.now().toString(),
      text,
      company: companyName,
      badgeLetter: badgeLetter,
      daysAgo: 0,
      upvoteCount: 0,
    };

    setFeedBackItems((prevFeedbackItems) => [
      ...prevFeedbackItems,
      newFeedback,
    ]);

    fetch(FEEDBACKS_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });
  };

  const handleSelectCompany = (company: string) => {
    if (selectedCompany === company) {
      setSelectedCompany("");

      return;
    }

    setSelectedCompany(company);
  };

  return (
    <FeedbackItemsContext.Provider
      value={{
        feedBackItems,
        isLoading,
        error,
        companyList,
        onAddFeedback: handleAddFeedback,
        onSelectCompany: handleSelectCompany,
        filteredFeedbackItems,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
