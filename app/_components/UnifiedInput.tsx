"use client";

import { FieldError, useFormContext } from "react-hook-form";
import FormError from "./formError";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  fieldName: string;
  componentType: "input" | "radio" | "select" | "textarea";
  options?: Option[];
  triggerLabel?: string;
  isNumber?: boolean;
  inputType?: "text" | "number";
  setValue?: string;
}

const UnifiedInput = ({
  label,
  componentType,
  fieldName,
  options,
  inputType = "text",
  isNumber = false,
  triggerLabel,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[fieldName] as FieldError;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={fieldName} className="label">
        {label} <span className="text-red-500">*</span>
      </label>
      {componentType === "input" && (
        <input
          {...register(fieldName, { valueAsNumber: isNumber })}
          type={inputType}
          className="input input-primary mystyle"
        />
      )}
      {componentType === "textarea" && (
        <textarea
          {...register(fieldName)}
          className="textarea textarea-primary mystyle"
        />
      )}
      {componentType === "select" && (
        <select
          {...register(fieldName)}
          name={fieldName}
          id={fieldName}
          className="select select-primary mystyle"
        >
          <option value="" defaultChecked={true}>
            {triggerLabel}
          </option>
          {options?.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {componentType === "radio" && (
        <div className=" flex justify-between px-5">
          {options?.map((option, i) => (
            <label className=" flex flex-col gap-1" key={i}>
              <span className="label">{option.label}</span>
              <input
                {...register(fieldName)}
                name={fieldName}
                type="radio"
                id={fieldName}
                value={option.value}
                className=""
              />
            </label>
          ))}
        </div>
      )}

      <FormError error={error} />
    </div>
  );
};

export default UnifiedInput;
