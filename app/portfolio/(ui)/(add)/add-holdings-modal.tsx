"use client";
import { portfolioCoinSearch } from "@/lib/querying";
import { usePortfolioStore } from "@/store/portfolio-store";
import Button from "@/ui/button";

import SelectSearch from "@/ui/select-search";
import { useQuery } from "@tanstack/react-query";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
const Modal = dynamic(() => import("@/ui/modal"));

export default function AddHoldingsModal({
  isModalOpen,
  modalToggle,
}: {
  isModalOpen: boolean;
  modalToggle: () => void;
}) {
  const [symbol, setSymbol] = useState<string>("");
  const [symbolDebounced] = useDebounce(symbol, 500);
  const { data: coinData } = useQuery(portfolioCoinSearch(symbolDebounced));
  const [quantity, setQuantity] = useState<number>(0);

  // TODO: show error required to form, especially when blank
  const addHoldings = usePortfolioStore((state) => state.addNewHoldings);

  const selectOptions = coinData
    ? coinData
        .filter((coin) => coin.name !== null && coin.id !== null)
        .map((coin) => ({
          label: coin.name as string,
          value: coin.id as string,
          imgSrc: coin.image,
        }))
    : [];

  const onSubmit = () => {
    addHoldings(symbol, quantity);
    modalToggle();
  };
  return (
    <Modal header="Add Coin" isOpen={isModalOpen} onClose={() => modalToggle()}>
      <div className="flex flex-col gap-3">
        <div>
          <label className="mb-2 text-sm font-medium">Coin</label>
          <SelectSearch
            options={selectOptions}
            onInput={(value) => setSymbol(value as string)}
          />
        </div>
        <div>
          <label className="mb-2 text-sm font-medium">Quantity</label>
          <input
            type="number"
            className="w-full rounded-lg border p-2.5 text-sm text-[#2E2E2E]"
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              setQuantity(+(e.target as HTMLInputElement).value);
            }}
            value={quantity}
            required
          />
        </div>
      </div>

      <Button onClick={() => onSubmit()} label="Submit" />
    </Modal>
  );
}
