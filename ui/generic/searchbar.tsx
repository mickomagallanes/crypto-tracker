"use client";

import { cn } from "@/lib/utils";
import { CircleX, Search } from "lucide-react";
import React, { useState } from "react";

interface SearchbarProps {
  isSearchOpen: boolean;
  searchToggle: () => void;
  cName?: string;
  onSearch?: (val: string) => void;
}

export default function Searchbar({
  isSearchOpen,
  searchToggle,
  cName = "",
  onSearch = () => {},
}: SearchbarProps) {
  const [value, setValue] = useState<string>("");

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClose = () => {
    if (value) {
      setValue("");
    } else {
      searchToggle();
    }
  };

  return (
    <div
      className={cn("mt-1 flex w-full cursor-pointer flex-row sm:mt-0", cName)}
    >
      <i
        className={cn(
          isSearchOpen
            ? "flex items-center justify-center rounded-l-md bg-gray-500 pl-1"
            : "justify-end text-xl",
        )}
        onClick={(e) => {
          !isSearchOpen ? searchToggle() : onSearch(value);
        }}
      >
        <Search size={isSearchOpen ? "20" : "25"} />
      </i>

      <input
        type="text"
        className={cn(
          "size-full bg-gray-500 p-2 text-sm text-white focus:outline-none",
          !isSearchOpen && "hidden",
        )}
        value={value}
        onKeyDown={handleEnter}
        onChange={handleChange}
      />

      {isSearchOpen && (
        <i
          className={cn(
            "flex items-center justify-center rounded-r-md bg-gray-500 pr-1",
          )}
          onClick={handleClose}
        >
          <CircleX />
        </i>
      )}
    </div>
  );
}
