// TODO: create chart component, finish symbol
import React from "react";
import CoinChart from "./(ui)/coin-chart";

export default function Symbol({
  params,
  searchParams,
}: {
  params: { symbol: string };
  searchParams: { days: string };
}) {
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-flow-col md:grid-cols-6 md:grid-rows-2 md:px-28">
      <div className="order-1 md:col-span-2">Header</div>
      <div className="order-3 md:order-2 md:col-span-2">Details</div>
      <div className="order-2 md:order-3 md:col-span-4 md:row-span-2">
        <CoinChart symbol={params.symbol} days={searchParams.days} />
      </div>
    </div>
  );
}
