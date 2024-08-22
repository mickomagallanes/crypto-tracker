import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const coinsQuery = request.nextUrl.searchParams.getAll("coins");

  if (coinsQuery !== null) {
    const marketQuery = `&ids=${coinsQuery.join(",")}`;

    const urlMarket = `${process.env.API_URL}/coins/markets?vs_currency=usd${marketQuery}&per_page=250&
    order=market_cap_rank&x_cg_demo_api_key=${process.env.API_KEY}`;

    const respMarket = await fetch(urlMarket);

    const data = await respMarket.json();

    return NextResponse.json(data);
  } else {
    return NextResponse.json(null);
  }
}
