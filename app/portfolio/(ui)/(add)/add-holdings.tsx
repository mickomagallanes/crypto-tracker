"use client";
import Button from "@/ui/button";
import useToggle from "@/ui/hooks/useToggle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import AddHoldingsModal from "./add-holdings-modal";

const queryClient = new QueryClient();

export default function AddHoldings() {
  const [isModalOpen, modalToggle] = useToggle();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Button
          onClick={() => modalToggle()}
          label="New Transaction"
          icon={<Plus />}
        />
        {isModalOpen && (
          <AddHoldingsModal
            isModalOpen={isModalOpen}
            modalToggle={modalToggle}
          />
        )}
      </QueryClientProvider>
    </>
  );
}
