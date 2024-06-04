import { GET_OPTIONS } from "@/lib/utils";
import Await from "@/ui/generic/await";

import useSearch from "@/ui/hooks/useSearch";
import NewsCards from "@/ui/news-cards";
import React, { Suspense } from "react";

export default async function News({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const searchQuery = searchParams.search ? `query=${searchParams.search}` : "";
  const searchPromise = useSearch(searchParams);

  const fetchNewsData = async (query: string) => {
    return fetch(
      `${process.env.API_URL_NEWS}?apikey=${process.env.API_KEY_NEWS}&${query}`,
      GET_OPTIONS,
    );
  };

  const mainFetch = async (searchResult: SearchResult) => {
    // if no search, proceed with regular fetch
    if (searchResult === null) {
      return fetchNewsData("qInMeta=crypto OR bitcoin");
    } else {
      if (searchResult?.coins?.length > 0) {
        const allCoins = searchResult.coins
          .filter((coin: SearchCoinObject) => coin.market_cap_rank !== null)
          .map((coin: SearchCoinObject) => coin.api_symbol)
          .join(" OR ");

        return fetchNewsData(`q=${allCoins}`);
      } else {
        // if has no search result
        return Promise.resolve(
          new Response(JSON.stringify([]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
        );
      }
    }
  };

  return (
    <div className="mx-auto xl:container">
      <Suspense key={searchQuery} fallback={<NewsCards isLoading={true} />}>
        <Await promise={searchPromise}>
          {(searchData) => (
            <Await promise={mainFetch(searchData)}>
              {(data) => <NewsCards newsData={data} />}
            </Await>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
