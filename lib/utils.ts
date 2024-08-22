import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const formatNumber = (value: number | null): string => {
  if (value === null) {
    return `-`;
  }

  return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
};

export const formatMoney = (value: number | null): string => {
  if (value === null || value === 0) {
    return `$0`;
  }

  const magnitude =
    Math.abs(value) >= 1 ? Math.floor(Math.log10(Math.abs(value))) : 0;

  let decimals = 2; // Default to 2 decimals for most cases

  // Adjust decimals based on magnitude
  if (magnitude >= 6) {
    decimals = 0; // No decimals for very large values (e.g., millions or more)
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
      minimumFractionDigits: 0,
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

export const calculateValueChange = (
  currentPrice: number,
  percentChange: number,
  coinHoldings: number,
): number => {
  // Convert percent change to a decimal
  const percentChangeDecimal = percentChange / 100;

  // Calculate the old price using the formula: Old Price = Current Price / (1 + Percent Change)
  const oldPrice = currentPrice / (1 + percentChangeDecimal);

  // Calculate the total value of coin holdings 24 hours ago
  const oldValue = coinHoldings * oldPrice;

  // Calculate the current total value of coin holdings
  const currentValue = coinHoldings * currentPrice;

  // Calculate the change in value
  const changeInValue = currentValue - oldValue;

  return changeInValue;
};
