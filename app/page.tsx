// "use client";
import { GET_OPTIONS } from "@/lib/utils";
import Await from "@/ui/generic/await";
import Table from "@/ui/generic/table";
import HomeTable from "@/ui/home-table";
import { Suspense } from "react";

interface SearchCoinObject {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

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
  const baseURL = "https://api.coingecko.com/api/v3";
  const getOptions = GET_OPTIONS;

  async function fetchSearchResults(query: string) {
    const response = await fetch(
      `${baseURL}/search?${query}&x_cg_demo_api_key=${apiKey}`,
      getOptions,
    );
    return response.json();
  }

  async function fetchMarketData(query: string) {
    return fetch(
      `${baseURL}/coins/markets?${query}&vs_currency=usd&order=market_cap_rank&x_cg_demo_api_key=${apiKey}`,
      getOptions,
    );
  }

  let result: Promise<Response>;

  if (searchParams.search) {
    // TODO: add loading to this await
    const searchResult = await fetchSearchResults(searchQuery);

    if (searchResult.coins.length > 0) {
      const allCoins = searchResult.coins
        .filter((coin: SearchCoinObject) => coin.market_cap_rank !== null)
        .map((coin: SearchCoinObject) => coin.api_symbol)
        .join(",");

      result = fetchMarketData(`ids=${allCoins}`);
    } else {
      result = Promise.resolve(
        new Response(JSON.stringify([]), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    }
  } else {
    result = fetchMarketData(searchQuery);
  }

  return (
    <>
      <Suspense
        key={searchQuery}
        fallback={<Table columns={cryptoColumnsLoading} isLoading={true} />}
      >
        <Await promise={result}>{(data) => <HomeTable data={data} />}</Await>
      </Suspense>
    </>
  );
}
