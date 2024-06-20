import React, { Suspense } from "react";
import CoinChart from "./(ui)/coin-chart";
import ChartLoading from "@/ui/generic/chart-loading";
import CoinHeader from "./(ui)/coin-header";

export default function Symbol({
  params,
  searchParams,
}: {
  params: { symbol: string };
  searchParams: { days: string };
}) {
  const daysQuery = searchParams.days ? `days=${searchParams.days}` : "";

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-flow-col md:grid-cols-6 md:grid-rows-2 md:px-24">
      <div className="order-1 md:col-span-2">
        <Suspense key={daysQuery} fallback={<ChartLoading />}>
          <CoinHeader symbol={params.symbol} days={searchParams.days} />
        </Suspense>
      </div>
      <div className="order-3 md:order-2 md:col-span-2">Details</div>

      <div className="order-2 border-l border-l-gray-800 pl-6 md:col-span-4 md:row-span-2">
        <Suspense key={daysQuery} fallback={<ChartLoading />}>
          <CoinChart symbol={params.symbol} days={searchParams.days} />
        </Suspense>
      </div>
    </div>
  );
}
