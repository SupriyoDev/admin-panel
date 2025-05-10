import { clsx, type ClassValue } from "clsx";
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
