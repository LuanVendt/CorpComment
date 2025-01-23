import { HashTagItemProps } from "../../lib/types";

export default function HashTagItem({
  company,
  onSelectCompany,
}: HashTagItemProps) {
  return (
    <li key={company} onClick={() => onSelectCompany(company)}>
      <button>#{company}</button>
    </li>
  );
}
