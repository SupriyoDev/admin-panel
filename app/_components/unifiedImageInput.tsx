import React, { useEffect, useState } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import FormError from "./formError";
import Image from "next/image";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  fieldName: string;
  isMultiple?: boolean;
  setUrl?: string[];
};

const UnifiedImgaeinput = ({
  label,
  fieldName,
  setUrl,
  isMultiple = false,
  className,
  ...props
}: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = errors[fieldName] as FieldError;
  //watch for file changes
  const imagefile = watch(fieldName) as FileList;

  //create a preview urls when file change

  useEffect(() => {
    if (setUrl) {
      setPreviewUrl([...setUrl]);
    }

    if (!isMultiple && imagefile && imagefile[0]) {
      const newUrl = URL.createObjectURL(imagefile[0]);
      setPreviewUrl([newUrl]);

      return () => URL.revokeObjectURL(newUrl);
    }
    if (isMultiple && imagefile && imagefile.length > 0) {
      const newUrls = Array.from(imagefile).map((file) =>
        URL.createObjectURL(file)
      );

      setPreviewUrl([...newUrls]);

      return () => newUrls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [imagefile]);

  const handleReset = () => {
    setValue(fieldName, undefined as any);
    setPreviewUrl([]);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldName}>{label}</label>

      <div className="flex gap-4 ">
        <div className="bg-[#008add] w-[500px] py-3 px-3 rounded-lg ">
          <input
            {...props}
            {...register(fieldName)}
            type="file"
            multiple={isMultiple}
            className="bg-[#008add]   text-white border-2 border-dashed w-full px-4"
          />
        </div>
        {previewUrl && previewUrl.length > 0 && (
          <button
            onClick={() => handleReset()}
            className=" btn bg-[#008add] rounded-lg text-white "
          >
            Reset
          </button>
        )}
      </div>
      <FormError error={error} />

      <div className="flex gap-2">
        {previewUrl?.map((url, i) => (
          <Image
            key={i}
            src={url}
            alt=""
            width={100}
            height={100}
            className=" w-60 h-40 bg-slate-400/50  rounded-lg object-contain p-2"
          />
        ))}
      </div>
    </div>
  );
};

export default UnifiedImgaeinput;
