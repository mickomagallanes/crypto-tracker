import React from "react";

import useSearch from "@/ui/hooks/useSearch";
import NewsCards from "@/app/news/(ui)/news-cards";
import { fetchNewsData } from "@/lib/fetching";

export default async function Main({ searchQuery }: { searchQuery: string }) {
  const searchData: Nullable<SearchResult> = await useSearch(searchQuery);
  let newsQuery = "qInMeta=crypto OR bitcoin";

  if (searchData !== null && searchData?.coins?.length > 0) {
    const allCoins = searchData.coins
      .filter((coin: SearchCoinObject) => coin.market_cap_rank !== null)
      .map((coin: SearchCoinObject) => coin.api_symbol)
      .join(" OR ");

    newsQuery = `q=${allCoins}`;
  }

  const data = await fetchNewsData(newsQuery);

  return <NewsCards newsData={data} />;
}
