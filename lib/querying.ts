import { queryOptions } from "@tanstack/react-query";
import checkAndGetSearch from "./checkAndGetSearch";
import {
  fetchMarketData,
  fetchMarketPortfolio,
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
      const data: APIMarketData = await fetchMarketPortfolio(query);
      return data;
    },
  });
}
