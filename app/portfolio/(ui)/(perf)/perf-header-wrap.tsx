"use client";
import { fetchMarketPortfolio } from "@/lib/fetching";
import React from "react";
import PerfHeader from "./perf-header";
import { portfolioMarket } from "@/lib/querying";
import { usePortfolioStore } from "@/store/portfolio-store";
import { useQuery } from "@tanstack/react-query";

export default function PerfHeaderWrap() {
  const getHoldingsAsQuery = usePortfolioStore(
    (state) => state.getHoldingsAsQuery,
  );
  const marketQuery = getHoldingsAsQuery();

  const { data, isLoading } = useQuery(portfolioMarket(marketQuery));

  return (
    <>
      <PerfHeader data={data ?? []} isLoading={isLoading} />
    </>
  );
}
