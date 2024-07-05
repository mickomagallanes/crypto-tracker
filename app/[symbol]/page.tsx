import React, { Suspense } from "react";
import CoinChart from "./(ui)/coin-chart";
import ChartSkeleton from "@/ui/skeleton/chart-skeleton";
import CoinHeader from "./(ui)/coin-header";
import DaysTabs from "./(ui)/days-tabs";
import HeaderSkeleton from "./(skeleton)/header-skeleton";
import CoinInfo from "./(ui)/coin-info";
import InfoSkeleton from "./(skeleton)/info-skeleton";

export default function Symbol({
  params,
  searchParams,
}: {
  params: { symbol: string };
  searchParams: { days: string };
}) {
  const daysQuery = searchParams.days ? `days=${searchParams.days}` : "";

  return (
    <div className="flex flex-col gap-4 px-2 sm:px-3 md:px-4 lg:grid lg:grid-flow-col lg:grid-cols-6 lg:grid-rows-4 lg:px-6 xl:grid-cols-7 ">
      <div className="order-1 mb-6 flex items-center lg:col-span-2 lg:row-span-1 lg:mb-0 lg:justify-center">
        <Suspense key={daysQuery + "header"} fallback={<HeaderSkeleton />}>
          <CoinHeader symbol={params.symbol} days={searchParams.days} />
        </Suspense>
      </div>
      <div className="order-3 mt-4 justify-center lg:order-2 lg:col-span-2 lg:row-span-3 lg:mt-0">
        <Suspense key={daysQuery + "header"} fallback={<InfoSkeleton />}>
          <CoinInfo symbol={params.symbol} days={searchParams.days} />
        </Suspense>
      </div>

      <div className="order-2 pl-1 lg:col-span-4 lg:row-span-4 lg:border-l lg:border-l-gray-800 lg:pl-2 xl:col-span-5 ">
        <div className="mb-1 flex justify-end lg:mb-8">
          <DaysTabs />
        </div>
        <div>
          <Suspense key={daysQuery} fallback={<ChartSkeleton />}>
            <CoinChart symbol={params.symbol} days={searchParams.days} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
