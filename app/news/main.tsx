import React from "react";
import { GET_OPTIONS } from "@/lib/utils";

import useSearch from "@/ui/hooks/useSearch";
import NewsCards from "@/app/news/(ui)/news-cards";

export default async function Main({ searchQuery }: { searchQuery: string }) {
  const searchData = await useSearch(searchQuery);
  let newsQuery = "qInMeta=crypto OR bitcoin";

  if (searchData?.coins?.length > 0) {
    const allCoins = searchData.coins
      .filter((coin: SearchCoinObject) => coin.market_cap_rank !== null)
      .map((coin: SearchCoinObject) => coin.api_symbol)
      .join(" OR ");

    newsQuery = `q=${allCoins}`;
  }

  const fetchNewsData = async (query: string) => {
    return fetch(
      `${process.env.API_URL_NEWS}?apikey=${process.env.API_KEY_NEWS}&${query}`,
      {
        ...GET_OPTIONS,
        cache: "no-store",
      },
    );
  };

  const resp = await fetchNewsData(newsQuery);
  const data = await resp.json();

  return <NewsCards newsData={data} />;
}
