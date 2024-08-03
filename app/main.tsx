import React from "react";
import HomeTable from "./home-table";
import { fetchMarketData } from "@/lib/fetching";
import checkAndGetSearch from "@/lib/checkAndGetSearch";

export default async function Main({ searchQuery }: { searchQuery: string }) {
  const searchData: Nullable<SearchResult> =
    await checkAndGetSearch(searchQuery);
  let marketQuery = "";

  if (searchData !== null && searchData.coins?.length > 0) {
    const allCoins = searchData.coins
      .filter((coin: SearchCoinObject) => coin.market_cap_rank !== null)
      .map((coin: SearchCoinObject) => coin.api_symbol)
      .join(",");

    marketQuery = `&ids=${allCoins}`;
  }

  const data: APIMarketData = await fetchMarketData(marketQuery);

  return <HomeTable data={data} />;
}
