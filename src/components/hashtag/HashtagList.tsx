import { HashTagListProps } from "../../lib/types";
import HashTagItem from "./HashTagItem";

export default function HashtagList({ companies }: HashTagListProps) {
  return (
    <ul className="hashtags">
      {companies.map((company) => (
        <HashTagItem company={company} />
      ))}
    </ul>
  );
}
