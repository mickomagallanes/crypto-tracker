"use client";
import { usePortfolioStore } from "@/store/portfolio-store";
import { useSearchParams } from "next/navigation";

export default function PerfHeaderWrap() {
  const searchParams = useSearchParams();
  const currentDays = searchParams.get("daysPerformance") ?? "1";
  const coinsQuery = usePortfolioStore((state) => state.computed);
  console.log(coinsQuery, " hellowwwwwwwwwwwwww");
  // const daysFormatted = daysMarketQuery(currentDays);

  // let marketQuery = "";

  // if (coinsQuery !== "") {
  //   marketQuery = `${coinsQuery}&days=${daysFormatted}`;
  // }

  // const { data, isLoading } = useQuery(portfolioMarket(marketQuery));

  // return (
  //   <>
  //     {isLoading ? (
  //       <PerfHeaderSkeleton />
  //     ) : (
  //       <PerfHeader data={data ?? []} days={daysFormatted} />
  //     )}
  //   </>
  // );
}
