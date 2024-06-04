import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));
export const GET_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json" },
};

export async function fetchSearchResults(query: string) {
  return fetch(
    `${process.env.API_URL}/search?${query}&x_cg_demo_api_key=${process.env.API_KEY}`,
    GET_OPTIONS,
  );
}
