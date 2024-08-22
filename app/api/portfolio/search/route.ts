import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams.get("searchQuery");

  let marketQuery = "";

  if (searchQuery !== "") {
    const urlSearch = `${process.env.API_URL}/search?query=${searchQuery}&x_cg_demo_api_key=${process.env.API_KEY}`;
    const respSearch = await fetch(urlSearch, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const searchData: SearchResult = await respSearch.json();

    if (searchData.coins?.length > 0) {
      const allCoins = searchData.coins
        .filter((coin: SearchCoinObject) => coin.market_cap_rank !== null)
        .map((coin: SearchCoinObject) => coin.api_symbol)
        .join(",");

      marketQuery = `&ids=${allCoins}`;
    } else {
      return NextResponse.json([]);
    }
  }

  const urlMarket = `${process.env.API_URL}/coins/markets?vs_currency=usd${marketQuery}&per_page=250&
      order=market_cap_rank&x_cg_demo_api_key=${process.env.API_KEY}`;

  const respMarket = await fetch(urlMarket, {
    next: { revalidate: 60 * 60 * 24 * 7 }, // Revalidate every 7 days
  });
  const data = await respMarket.json();

  return NextResponse.json(data);
}
