import React, { Suspense } from "react";
import Performance from "./(ui)/performance";
import { LineChart2 } from "@/ui/line-chart";
export default function Portfolio({
  params,
  searchParams,
}: {
  params: { symbol: string };
  searchParams: { days: string };
}) {
  const daysQuery = searchParams.days ? `days=${searchParams.days}` : "";

  return (
    <div className="mt-2 flex flex-col gap-4 px-2 sm:px-3 md:px-4 lg:grid lg:grid-flow-col lg:grid-cols-6 lg:grid-rows-4 lg:px-6 xl:grid-cols-7 ">
      <div className="flex flex-col gap-7">
        <h2 className="text-xl">Performance</h2>
        <Performance />
      </div>
      <div className="">{/* <LineChart2 /> */}</div>

      <div className=""></div>
    </div>
  );
}
