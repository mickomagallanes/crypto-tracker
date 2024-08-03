"use client";
import { portfolioCoinSearch } from "@/lib/querying";
import Button from "@/ui/button";
import useToggle from "@/ui/hooks/useToggle";

import SelectSearch from "@/ui/select-search";
import { useQuery } from "@tanstack/react-query";

import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const Modal = dynamic(() => import("@/ui/modal"));

export default function AddHoldingsForm() {
  const [isModalOpen, modalToggle] = useToggle();

  const [symbol, setSymbol] = useState<string>("");
  // TODO: fix this useQuery
  const { data: coinData } = useQuery(portfolioCoinSearch("r"));
  const [quantity, setQuantity] = useState<number>(0);

  // TODO: create new component for modal, then do the fetching there
  // TODO fix select search
  return (
    <>
      <Button
        onClick={() => modalToggle()}
        label="New Transaction"
        icon={<Plus />}
      />

      <Modal
        header="Add Coin"
        isOpen={isModalOpen}
        onClose={() => modalToggle()}
      >
        <div className="flex flex-col gap-3">
          <div>
            <SelectSearch
              options={[]}
              onInput={(value) => setSymbol(value as string)}
            />
            <label htmlFor="email" className="mb-2 text-sm font-medium ">
              Symbol
            </label>
            <input
              type="text"
              className="w-full rounded-lg border 
              p-2.5 text-sm text-[#2E2E2E]
             "
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 text-sm font-medium ">
              Quantity
            </label>
            <input
              type="number"
              className="w-full rounded-lg border p-2.5 text-sm text-[#2E2E2E]"
              required
            />
          </div>
        </div>

        <Button onClick={() => modalToggle()} label="Submit" />
      </Modal>
    </>
  );
}
