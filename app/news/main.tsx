import React from "react";

import useSearch from "@/ui/hooks/useSearch";
import NewsCards from "@/app/news/(ui)/news-cards";
import { fetchNewsData } from "@/lib/fetching";
import NoData from "@/ui/no-data";

export default async function Main({
  searchQuery,
  searchWord,
}: {
  searchQuery: string;
  searchWord: string;
}) {
  const searchData: Nullable<SearchResult> = await useSearch(searchQuery);
  let newsQuery = !searchWord
    ? "q=crypto OR bitcoin"
    : `q="${searchWord}" AND crypto`;

  if (searchData !== null && searchData?.coins?.length > 0) {
    const allCoins = searchData.coins
      .filter(
        (coin: SearchCoinObject) =>
          coin.market_cap_rank !== null && coin.market_cap_rank < 500,
      ) // to only show legitimate crypto
      .map(
        (coin: SearchCoinObject) =>
          `(${coin.api_symbol} AND ${coin.symbol} AND crypto)`,
      )
      .join(" OR ");

    if (allCoins.length) {
      newsQuery = `q=${allCoins}`;
    }
  }

  const data: APINewsObject = await fetchNewsData(newsQuery);

  return data.results.length > 0 ? (
    <NewsCards newsData={data.results} />
  ) : (
    <NoData />
  );
}
