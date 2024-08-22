"use client";
import { portfolioCoinSearch } from "@/lib/querying";
import Button from "@/ui/button";
import useToggle from "@/ui/hooks/useToggle";

import SelectSearch from "@/ui/select-search";
import { useQuery } from "@tanstack/react-query";

import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import AddHoldingsModal from "./add-holdings-modal";
import { usePortfolioStore } from "@/store/portfolio-store";

export default function AddHoldingsForm() {
  const [isModalOpen, modalToggle] = useToggle();

  return (
    <>
      <Button
        onClick={() => modalToggle()}
        label="New Transaction"
        icon={<Plus />}
      />
      {isModalOpen && (
        <AddHoldingsModal isModalOpen={isModalOpen} modalToggle={modalToggle} />
      )}
    </>
  );
}
