// "use client";
import { GET_OPTIONS, fetchSearchResults } from "@/lib/utils";
import Await from "@/ui/generic/await";
import Table from "@/ui/generic/table";
import HomeTable from "@/ui/home-table";
import useSearch from "@/ui/hooks/useSearch";
import { Suspense } from "react";

const cryptoColumnsLoading = [
  { header: "#", key: "id" },
  {
    header: "Name",
    key: "name",
  },
  {
    header: "24h %",
    key: "24h",
  },
  {
    header: "Price",
    key: "price",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const searchQuery = searchParams.search ? `query=${searchParams.search}` : "";
  const apiKey = process.env.API_KEY;
  const baseURL = process.env.API_URL;
  const getOptions = GET_OPTIONS;

  const searchPromise = useSearch(searchParams);

  async function fetchMarketData(query: string = "") {
    return fetch(
      `${baseURL}/coins/markets?${query}&vs_currency=usd&order=market_cap_rank&x_cg_demo_api_key=${apiKey}`,
      getOptions,
    );
  }

  const mainFetch = async (searchResult: SearchResult) => {
    // if no search, proceed with regular fetch
    if (searchResult === null) {
      return fetchMarketData(searchQuery);
    } else {
      if (searchResult?.coins?.length > 0) {
        const allCoins = searchResult.coins
          .filter((coin: SearchCoinObject) => coin.market_cap_rank !== null)
          .map((coin: SearchCoinObject) => coin.api_symbol)
          .join(",");

        return fetchMarketData(`ids=${allCoins}`);
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

  // loads with suspense, first from useSearch, then main fetch
  return (
    <div className="container mx-auto pb-6 sm:px-16">
      <Suspense
        key={searchQuery}
        fallback={<Table columns={cryptoColumnsLoading} isLoading={true} />}
      >
        <Await promise={searchPromise}>
          {(searchData) => (
            <Await promise={mainFetch(searchData)}>
              {(data) => <HomeTable data={data} />}
            </Await>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
