import clsx from "clsx";
import { ClassValue } from "clsx";

import { twMerge } from "tw-merge";

//cloudinary config

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function BufferToBase64(image: Buffer) {
  return `data:image/webp;base64,${image.toString("base64")}`;
}
