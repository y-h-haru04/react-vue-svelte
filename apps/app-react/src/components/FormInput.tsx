import {
  type ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

type Props = {
  id?: string;
  inputType?: "text" | "date";
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type FormInputHandle = {
  focus: () => void;
};

const FormInput = forwardRef<FormInputHandle, Props>(
  ({ id, title, inputType, value, onChange }: Props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }));

    return (
      <div className="form-group">
        {title && id && (
          <label htmlFor={id} className="form-label">
            {title}
          </label>
        )}

        <input
          id={id}
          type={inputType || "text"}
          className="form-input"
          ref={inputRef}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  },
);

export default FormInput;
