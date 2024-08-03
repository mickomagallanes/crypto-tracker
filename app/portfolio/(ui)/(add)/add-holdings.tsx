"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import AddHoldingsForm from "./add-holdings-form";

const queryClient = new QueryClient();

// TODO: maybe you dont need this component, just do the query provider on the holdings form
export default function AddHoldings() {
  return (
    <QueryClientProvider client={queryClient}>
      <AddHoldingsForm />
    </QueryClientProvider>
  );
}
