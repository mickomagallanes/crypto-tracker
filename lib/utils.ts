import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));
export const GET_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json" },
};

export const formatMoney = (value: number) => {
  const magnitude =
    Math.abs(value) >= 1 ? Math.floor(Math.log10(Math.abs(value))) : 0;

  let decimals = 2; // Default to 2 decimals for most cases

  // Adjust decimals based on magnitude
  if (magnitude >= 6) {
    decimals = 0; // No decimals for very large values (e.g., millions or more)
  } else if (magnitude >= 4) {
    decimals = 2; // Two decimals for values in the thousands
  } else if (magnitude >= 2) {
    decimals = 2; // Four decimals for values in the hundreds
  } else {
    decimals = 8; // Six decimals for very small values (e.g., fractions)
  }

  // Format the value
  let formattedValue: string;

  // Use scientific notation for very small or very large numbers
  if (Math.abs(value) < 1e-6) {
    formattedValue = value.toExponential(decimals);
  } else {
    formattedValue = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }

  return formattedValue;
};

export const funcDefaultReturn = (param: any) => {
  return param;
};

export const daysMarketQuery = (days: string) => {
  if (days === "1") {
    return "24h";
  } else if (days === "365") {
    return "1y";
  } else {
    return `${days}d`;
  }
};
