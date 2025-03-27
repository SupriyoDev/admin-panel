import React from "react";
import { FieldError } from "react-hook-form";

interface props {
  error?: FieldError;
}

const FormError = ({ error }: props) => {
  if (!error) return null;
  return <p className="mt-1 text-sm text-red-600">{error.message}</p>;
};

export default FormError;
