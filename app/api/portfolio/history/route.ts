import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const symbolQuery = request.nextUrl.searchParams.getAll("symbol");
  const daysQuery = request.nextUrl.searchParams.getAll("days");

  if (symbolQuery !== null && daysQuery !== null) {
    const urlMarket = `${process.env.API_URL}/coins/${symbolQuery}/market_chart?days=${daysQuery}&vs_currency=usd&x_cg_demo_api_key=${process.env.API_KEY}`;

    const respMarket = await fetch(urlMarket, { cache: "no-store" });

    const data = await respMarket.json();

    return NextResponse.json(data);
  } else {
    return NextResponse.json(null);
  }
}
