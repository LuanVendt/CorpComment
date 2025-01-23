import { useEffect, useMemo, useState } from "react";
import { FeedbackItemsContext } from "../hooks/hooks";
import { FEEDBACKS_URL } from "../lib/constants";
import { FeedbackItemsContextProviderProps, TFeedbackItem } from "../lib/types";

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const [feedBackItems, setFeedBackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(FEEDBACKS_URL);

        if (!response.ok) throw new Error();

        const data = await response.json();

        setFeedBackItems(data.feedbacks);

        setIsLoading(false);
      } catch (error) {
        setError("Something went wrong. Please try again later.");

        setIsLoading(false);
      }
    };

    fetchFeedbackItems();
  }, []);

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
