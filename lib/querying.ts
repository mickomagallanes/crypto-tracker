import { queryOptions } from "@tanstack/react-query";
import checkAndGetSearch from "./checkAndGetSearch";
import {
  fetchMarketData,
  fetchPortfolioHistory,
  fetchPortfolioMarket,
  fetchPortfolioSearch,
} from "./fetching";

export function portfolioCoinSearch(searchQuery: string) {
  return queryOptions({
    queryKey: ["portfolioSearch", searchQuery],
    queryFn: async () => {
      const data = await fetchPortfolioSearch(searchQuery);

      return data;
    },
    staleTime: 5 * 1000,
  });
}

export function portfolioMarket(query: string) {
  return queryOptions({
    queryKey: ["portfolioMarket", query],
    queryFn: async () => {
      const data: APIMarketData = await fetchPortfolioMarket(query);
      return data;
    },
  });
}

export function portfolioHistory(holdings: string[], days: string) {
  return queryOptions({
    queryKey: ["portfolioHistory", days],
    queryFn: async () => {
      // Create an array of fetch promises
      const fetchPromises = holdings.map(async (symbol) => ({
        data: await fetchPortfolioHistory(symbol, days),
        symbol: symbol,
      }));

      // Use Promise.all to wait for all the fetch promises to complete
      const responses = await Promise.all(fetchPromises);
      return responses;
    },
  });
}
