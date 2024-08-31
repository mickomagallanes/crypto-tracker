"use client";
import { fetchPortfolioMarket } from "@/lib/fetching";
import React from "react";
import PerfHeader from "./perf-header";
import { portfolioMarket } from "@/lib/querying";
import { usePortfolioStore } from "@/store/portfolio-store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { daysMarketQuery } from "@/lib/utils";

export default function PerfHeaderWrap() {
  const getHoldingsAsQuery = usePortfolioStore(
    (state) => state.getHoldingsAsQuery,
  );
  const searchParams = useSearchParams();
  const currentDays = searchParams.get("daysPerformance") ?? "1";
  const coinsQuery = getHoldingsAsQuery();

  const daysFormatted = daysMarketQuery(currentDays);

  let marketQuery = "";

  if (coinsQuery !== "") {
    marketQuery = `${coinsQuery}&days=${daysFormatted}`;
  }

  const { data, isLoading } = useQuery(portfolioMarket(marketQuery));

  return (
    <>
      <PerfHeader
        data={data ?? []}
        isLoading={isLoading}
        days={daysFormatted}
      />
    </>
  );
}
