import React, { Suspense } from "react";
import CoinChart from "./(ui)/coin-chart";
import ChartLoading from "@/ui/generic/chart-loading";
import CoinHeader from "./(ui)/coin-header";
import DaysTabs from "./(ui)/days-tabs";
import HeaderSkeleton from "./(skeleton)/header-skeleton";

export default function Symbol({
  params,
  searchParams,
}: {
  params: { symbol: string };
  searchParams: { days: string };
}) {
  const daysQuery = searchParams.days ? `days=${searchParams.days}` : "";

  return (
    <div className="flex flex-col gap-4 px-1 md:grid md:grid-flow-col md:grid-cols-6 md:grid-rows-2 md:px-6 lg:px-12">
      <div className="order-1 mb-6 flex items-center md:col-span-2 md:mb-0 md:justify-center">
        <Suspense key={daysQuery} fallback={<HeaderSkeleton />}>
          <CoinHeader symbol={params.symbol} days={searchParams.days} />
        </Suspense>
      </div>
      <div className="order-3 md:order-2 md:col-span-2">Details</div>

      <div className="order-2 pl-1 md:col-span-4 md:row-span-2 md:border-l md:border-l-gray-800 md:pl-2">
        <div className="mb-1 flex justify-end md:mb-8">
          <DaysTabs />
        </div>
        <Suspense key={daysQuery} fallback={<ChartLoading />}>
          <CoinChart symbol={params.symbol} days={searchParams.days} />
        </Suspense>
      </div>
    </div>
  );
}
