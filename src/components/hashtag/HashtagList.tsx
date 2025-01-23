import { HashTagListProps } from "../../lib/types";
import HashTagItem from "./HashTagItem";

export default function HashtagList({
  companies,
  handleSelectCompany,
}: HashTagListProps) {
  return (
    <ul className="hashtags">
      {companies.map((company) => (
        <HashTagItem company={company} onSelectCompany={handleSelectCompany} />
      ))}
    </ul>
  );
}
