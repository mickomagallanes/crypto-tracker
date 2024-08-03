import { queryOptions } from "@tanstack/react-query";
import checkAndGetSearch from "./checkAndGetSearch";
import { fetchMarketData } from "./fetching";

// TODO: decide if you really want react query since it will expose your keys, do you need backend?
export function portfolioCoinSearch(searchQuery: string) {
  return queryOptions({
    queryKey: ["groups", searchQuery],
    queryFn: async () => {
      const searchData: Nullable<SearchResult> =
        await checkAndGetSearch(searchQuery);
      let marketQuery = "";
      // TODO: check if multiple fetch is really good, or just have separate useQuery hook call
      console.log(searchData, " dogggggggggggggggggsssssssssssss");
      if (searchData !== null && searchData.coins?.length > 0) {
        const allCoins = searchData.coins
          .filter((coin: SearchCoinObject) => coin.market_cap_rank !== null)
          .map((coin: SearchCoinObject) => coin.api_symbol)
          .join(",");

        marketQuery = `&ids=${allCoins}`;
      }

      const data: APIMarketData = await fetchMarketData(marketQuery);

      return data;
    },
    staleTime: 5 * 1000,
  });
}
