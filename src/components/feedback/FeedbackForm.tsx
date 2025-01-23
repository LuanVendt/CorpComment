import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";
import { FeedbackFormProps } from "../../lib/types";

export default function FeedbackForm({ onAddFeedback }: FeedbackFormProps) {
  const [text, setText] = useState("");

  const charCount = MAX_CHARACTERS - text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    if (newText.length > MAX_CHARACTERS) {
      return;
    }

    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) {
      setText("");
      return;
    }

    if (!text.includes("#") || !text.split("#")[1].trim()) {
      return;
    }

    onAddFeedback(text);

    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
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
