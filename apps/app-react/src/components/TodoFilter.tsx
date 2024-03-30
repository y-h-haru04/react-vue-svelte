import { SEARCH_SELECT_OPTIONS, SearchCriteria } from "common";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { useEffect, useRef, useState } from "react";

type Props = {
  onCriteriaChange: (searchCriteria: SearchCriteria) => void;
};

const TodoFilter = ({ onCriteriaChange }: Props) => {
  const timeoutId = useRef<number | undefined>(undefined);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputDeadline, setInputDeadline] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState(
    SEARCH_SELECT_OPTIONS[0],
  );

  useEffect(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      onCriteriaChange({
        title: inputTitle.trim(),
        deadline: inputDeadline.trim(),
        status: selectedStatus.id,
      });
    }, 500);
  }, [inputTitle, inputDeadline, selectedStatus]);

  return (
    <div className="py-2 flex gap-2">
      <FormInput
        id="filter-title"
        title="タイトル"
        value={inputTitle}
        onChange={e => setInputTitle(e.currentTarget.value)}
      />
      <FormInput
        id="filter-deadline"
        title="期日"
        inputType="date"
        value={inputDeadline}
        onChange={e => setInputDeadline(e.currentTarget.value)}
      />
      <FormSelect<(typeof SEARCH_SELECT_OPTIONS)[number]>
        title="ステータス"
        id="filter-status"
        options={SEARCH_SELECT_OPTIONS}
        value={selectedStatus}
        onChange={option => setSelectedStatus(option)}
      />
    </div>
  );
};

export default TodoFilter;
