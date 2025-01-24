import useFeedbackItemsStore from "../../stores/feedbackItemsStore";
import HashTagItem from "./HashTagItem";

export default function HashtagList() {
  const companyList = useFeedbackItemsStore((state) => state.getCompanyList());
  const onSelectCompany = useFeedbackItemsStore((state) => state.selectCompany);

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
