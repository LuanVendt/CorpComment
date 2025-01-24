import { create } from "zustand";
import { FEEDBACKS_URL } from "../lib/constants";
import { Store, TFeedbackItem } from "../lib/types";

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  error: "",
  selectedCompany: "",
  getCompanyList: () => [
    ...new Set(get().feedbackItems.map((feedback) => feedback.company)),
  ],
  getFilteredFeedbackItems: () =>
    get().selectedCompany
      ? get().feedbackItems.filter(
          (feedback) => feedback.company === get().selectedCompany
        )
      : get().feedbackItems,
  addFeedback: async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);

    const newFeedback: TFeedbackItem = {
      id: Date.now().toString(),
      text,
      company: companyName,
      badgeLetter: companyName?.substring(0, 1).toUpperCase(),
      daysAgo: 0,
      upvoteCount: 0,
    };

    set((state) => ({
      feedbackItems: [...state.feedbackItems, newFeedback],
    }));

    await fetch(FEEDBACKS_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });
  },
  selectCompany: (company: string) => {
    set((state) => ({
      selectedCompany: state.selectedCompany === company ? "" : company,
    }));
  },
  fetchFeedbackItems: async () => {
    set(() => ({ isLoading: true }));

    try {
      const response = await fetch(FEEDBACKS_URL);

      if (!response.ok) throw new Error();

      const data = await response.json();

      set({ feedbackItems: data.feedbacks });
    } catch (error) {
      set({
        error: "Something went wrong. Please try again later.",
      });
    }

    set(() => ({ isLoading: false }));
  },
}));
export default useFeedbackItemsStore;
