import { useEffect, useState } from "react";
import { FEEDBACKS_URL } from "../lib/constants";
import { TFeedbackItem } from "../lib/types";
import HashtagList from "./hashtag/HashtagList";
import Container from "./layout/Container";
import Footer from "./layout/Footer";

function App() {
  const [feedBackItems, setFeedBackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const companyList = [
    ...new Set(feedBackItems.map((feedback) => feedback.company)),
  ];

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
    <div className="app">
      <Footer />

      <Container
        feedBackItems={feedBackItems}
        isLoading={isLoading}
        error={error}
        onAddFeedback={handleAddFeedback}
      />

      <HashtagList companies={companyList} />
    </div>
  );
}

export default App;
