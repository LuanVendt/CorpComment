import { HashTagListProps } from "../lib/types";

export default function HashtagList({ companies }: HashTagListProps) {
  return (
    <ul className="hashtags">
      {companies.map((company) => (
        <li key={company}>
          <button>#{company}</button>
        </li>
      ))}
    </ul>
  );
}
