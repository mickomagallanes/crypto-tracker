"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HoldFetcher from "./hold-fetcher";

const queryClient = new QueryClient();

export default function Holdings() {
  return (
    <QueryClientProvider client={queryClient}>
      <HoldFetcher />
    </QueryClientProvider>
  );
}
