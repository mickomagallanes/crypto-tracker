import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));
export const GET_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json" },
};
