import React, { FC } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

const SelectField: FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Pilih salah satu",
  disabled,
  required,
}) => {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-outfit-semibold">{label}</span>
      <div className="pr-2 rounded bg-home">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="p-1.5 text-sm border-none rounded outline-none bg-home text-primary w-full"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
};

export default SelectField;
