import type { InputHTMLAttributes } from "react";

type InputFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputField({
  id,
  label,
  placeholder,
  type = "text",
  defaultValue,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300/90 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
