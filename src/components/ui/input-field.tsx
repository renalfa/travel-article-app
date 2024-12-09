import React, { FC, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface Props {
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "textarea"
    | "file";
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  accept?: string;
  multiple?: boolean;
}

const InputField: FC<Props> = ({
  type,
  label,
  placeholder = "Masukan inputan",
  value,
  onChange,
  disabled,
  required,
  rows,
  accept,
  multiple = false,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  if (type === "password") {
    return (
      <label className="flex flex-col gap-2">
        <span className="font-outfit-semibold">{label}</span>
        <div className="flex items-center py-1.5 gap-2 px-4 rounded bg-home">
          <input
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            type={showPassword ? "text" : "password"}
            placeholder="Masukan password"
            className="w-full text-sm bg-transparent border-none rounded outline-none text-primary"
          />
          {showPassword ? (
            <FaRegEye
              className="cursor-pointer text-primary"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaRegEyeSlash
              className="cursor-pointer text-primary"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </label>
    );
  }

  if (type === "textarea") {
    return (
      <label className="flex flex-col gap-2">
        <span className="font-outfit-semibold">{label}</span>
        <textarea
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          rows={rows || 3}
          className="px-4 py-1.5 text-sm border-none rounded outline-none bg-home text-primary"
        ></textarea>
      </label>
    );
  }

  if (type === "file") {
    return (
      <label className="flex flex-col gap-2">
        <span className="font-outfit-semibold">{label}</span>
        <input
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              onChange(e);
            }
          }}
          disabled={disabled}
          required={required}
          type="file"
          accept={accept}
          multiple={multiple}
          className="disabled:brightness-90 p-1.5 text-sm border-none rounded outline-none bg-home text-primary file:bg-primary file:text-white file:border-none file:rounded file:px-4 file:py-1.5"
        />
      </label>
    );
  }

  return (
    <label className="flex flex-col gap-2">
      <span className="font-outfit-semibold">{label}</span>
      <input
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        type={type}
        placeholder={placeholder}
        className="px-4 py-1.5 text-sm border-none rounded outline-none bg-home text-primary"
      />
    </label>
  );
};

export default InputField;
