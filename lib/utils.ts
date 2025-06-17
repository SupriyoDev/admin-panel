import { clsx, type ClassValue } from "clsx";
import { FormEvent, RefObject, SetStateAction } from "react";
import toast, { ToastType } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function BufferToBase64(buffer: Buffer<ArrayBufferLike>) {
  const dataUri = `data:image/webp;base64,${buffer.toString("base64")}`;
  return dataUri;
}

export function ExtractPublicId(urls: string[]) {
  return urls.map((url) => {
    const urlParts = url.split("/");
    const folder = urlParts[urlParts.length - 2];
    const filename = urlParts[urlParts.length - 1].split(".")[0];

    return `${folder}/${filename}`;
  });
}

export const LaptopDataUpdateHandler = (
  itemId: string,
  fieldName: string,
  targetref: RefObject<HTMLInputElement | HTMLTextAreaElement | null>,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  updateAction: (
    data: FormData
  ) => Promise<{ error?: string; message?: string }>
) => {
  return async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);

    try {
      e.preventDefault();
      const formdata = new FormData();
      if (targetref.current) {
        formdata.append("laptop_id", itemId);
        formdata.append(fieldName, targetref.current.value);
      }

      const res = await updateAction(formdata);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message!);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
};
