import React from "react";
import { GET_OPTIONS } from "@/lib/utils";
import HomeTable from "@/ui/home-table";
import useSearch from "@/ui/hooks/useSearch";

export default async function Main({ searchQuery }: { searchQuery: string }) {
  const searchData = await useSearch(searchQuery);
  let marketQuery = "";

  if (searchData?.coins?.length > 0) {
    const allCoins = searchData.coins
      .filter((coin: SearchCoinObject) => coin.market_cap_rank !== null)
      .map((coin: SearchCoinObject) => coin.api_symbol)
      .join(",");

    marketQuery = `&ids=${allCoins}`;
  }

  async function fetchMarketData() {
    return fetch(
      `${process.env.API_URL}/coins/markets?vs_currency=usd${marketQuery}&
        price_change_percentage=24h
        &per_page=250&
        order=market_cap_rank&x_cg_demo_api_key=${process.env.API_KEY}`,
      {
        ...GET_OPTIONS,
        cache: "no-store",
      },
    );
  }

  const resp = await fetchMarketData();
  const data = await resp.json();

  return <HomeTable data={data} />;
}
