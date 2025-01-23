import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";
import { FeedbackFormProps } from "../../lib/types";

export default function FeedbackForm({ onAddFeedback }: FeedbackFormProps) {
  const [text, setText] = useState("");
  const [showValidIndicador, setShowValidIndicador] = useState(false);
  const [showInvalidIndicador, setShowInvalidIndicador] = useState(false);

  const charCount = MAX_CHARACTERS - text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    if (newText.length > MAX_CHARACTERS) return;

    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) {
      setText("");
      setShowInvalidIndicador(true);
      return;
    }

    if (
      !text.includes("#") ||
      !text.split("#")[1].trim() ||
      text.trim().length < 5
    ) {
      setShowInvalidIndicador(true);

      return;
    } else {
      setShowValidIndicador(true);
      setTimeout(() => setShowValidIndicador(false), 1500);
    }

    onAddFeedback(text);

    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicador ? "form--valid" : ""} ${
        showInvalidIndicador ? "form--invalid" : ""
      }`}
    >
      <textarea
        id="feedback-textarea"
        placeholder=""
        spellCheck={false}
        value={text}
        onChange={handleChange}
      />

      <label htmlFor="feedback-textarea">
        Enter your feedback here. Remember to #hashtag the company
      </label>

      <div>
        <p className="u-italic">{charCount}</p>

        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
