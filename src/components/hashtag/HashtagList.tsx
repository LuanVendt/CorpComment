import { useFeedbackItemsContext } from "../../hooks/hooks";
import HashTagItem from "./HashTagItem";

export default function HashtagList() {
  const { companyList, onSelectCompany } = useFeedbackItemsContext();

  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashTagItem
          key={company}
          company={company}
          onSelectCompany={onSelectCompany}
        />
      ))}
    </ul>
  );
}
