import { ChangeEvent } from "react";

type Option = {
  id: number;
  text: string;
};

type Props<T extends Option> = {
  id?: string;
  title?: string;
  value: T;
  options: T[];
  onChange: (option: T) => void;
};

const FormSelect = <T extends Option>({
  id,
  title,
  value,
  options,
  onChange,
}: Props<T>) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = options.find((option: T) => {
      return option.id === parseInt(e.currentTarget.value, 10);
    });
    if (option) {
      onChange(option);
    }
  };

  return (
    <div className="form-group">
      {title && id && (
        <label htmlFor={id} className="form-label">
          {title}
        </label>
      )}
      {/* NOTE: svelteとは違いこういう割り当て方はできない */}
      {/* <select id={id} className="form-input" value={value}>
        {options.map((option: T) => (
          <option value={option}>{option.text}</option>
        ))}
      </select> */}
      {/* TODO: null扱えないらしい */}
      <select
        id={id}
        className="form-input"
        defaultValue={value.id}
        onChange={handleChange}
      >
        {options.map((option: T) => (
          <option key={option.id} value={option.id}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
