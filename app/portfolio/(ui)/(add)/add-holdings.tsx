"use client";
import Button from "@/ui/button";
import useToggle from "@/ui/hooks/useToggle";
import Modal from "@/ui/modal";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export default function AddHoldings() {
  const [isModalOpen, modalToggle] = useToggle();

  const [symbol, setSymbol] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

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
